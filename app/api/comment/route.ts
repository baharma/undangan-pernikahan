import { NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import { createAppwriteServer } from "@/lib/appwrite-server";

const databaseId =
  process.env.APPWRITE_DATABASE_ID ?? process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId =
  process.env.APPWRITE_COMMENT_COLLECTION_ID ??
  process.env.NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID;

const getDatabases = () => {
  if (!databaseId || !collectionId) {
    throw new Error("Konfigurasi Appwrite belum lengkap.");
  }
  return createAppwriteServer().databases;
};

export async function GET() {
  try {
    const databases = getDatabases();
    const response = await databases.listDocuments(databaseId!, collectionId!, [
      Query.orderDesc("$createdAt"),
      Query.limit(100),
    ]);

    const documents = response.documents
      .map((doc) => {
        const data = doc as Record<string, unknown>;
        const name = typeof data.name === "string" ? data.name : "";
        const content = typeof data.content === "string" ? data.content : "";
        const kehadiran =
          data.kehadiran === "Hadir" || data.kehadiran === "Tidak hadir"
            ? data.kehadiran
            : "Hadir";
        const createdAt = typeof data.createdAt === "string" ? data.createdAt : undefined;

        return {
          ...doc,
          name,
          content,
          kehadiran,
          createdAt,
        };
      })
      .filter((doc) => doc.name && doc.content && doc.kehadiran);

    return NextResponse.json({ documents });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error)?.message || "Gagal memuat ucapan." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const databases = getDatabases();
    const body = (await request.json()) as {
      name?: string;
      content?: string;
      kehadiran?: string;
      createdAt?: string;
    };

    const name = body.name?.trim() ?? "";
    const content = body.content?.trim() ?? "";
    const kehadiran = body.kehadiran === "Tidak hadir" ? "Tidak hadir" : "Hadir";
    const createdAt = body.createdAt ?? new Date().toISOString();

    if (!name || !content) {
      return NextResponse.json({ message: "Nama dan ucapan wajib diisi." }, { status: 400 });
    }

    const document = await databases.createDocument(databaseId!, collectionId!, ID.unique(), {
      name,
      content,
      kehadiran,
      createdAt,
    });

    return NextResponse.json({ document });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error)?.message || "Gagal menyimpan ucapan." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const databases = getDatabases();
    const body = (await request.json()) as {
      id?: string;
      name?: string;
      content?: string;
      kehadiran?: string;
    };

    if (!body.id) {
      return NextResponse.json({ message: "ID dokumen wajib diisi." }, { status: 400 });
    }

    const name = body.name?.trim() ?? "";
    const content = body.content?.trim() ?? "";
    const kehadiran = body.kehadiran === "Tidak hadir" ? "Tidak hadir" : "Hadir";

    if (!name || !content) {
      return NextResponse.json({ message: "Nama dan ucapan wajib diisi." }, { status: 400 });
    }

    const document = await databases.updateDocument(databaseId!, collectionId!, body.id, {
      name,
      content,
      kehadiran,
    });

    return NextResponse.json({ document });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error)?.message || "Gagal memperbarui ucapan." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const databases = getDatabases();
    const body = (await request.json()) as { id?: string };

    if (!body.id) {
      return NextResponse.json({ message: "ID dokumen wajib diisi." }, { status: 400 });
    }

    await databases.deleteDocument(databaseId!, collectionId!, body.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error)?.message || "Gagal menghapus ucapan." },
      { status: 500 },
    );
  }
}
