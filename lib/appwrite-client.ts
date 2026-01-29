import { Account, Client, Databases, ID, Query } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "";
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "";

let cachedClient: Client | null = null;
let cachedDatabases: Databases | null = null;
let cachedAccount: Account | null = null;

const getClient = () => {
  if (!endpoint || !projectId) return null;
  if (!cachedClient) {
    cachedClient = new Client().setEndpoint(endpoint).setProject(projectId);
  }
  return cachedClient;
};

export const getDatabases = () => {
  const client = getClient();
  if (!client) return null;
  if (!cachedDatabases) cachedDatabases = new Databases(client);
  return cachedDatabases;
};

export const getAccount = () => {
  const client = getClient();
  if (!client) return null;
  if (!cachedAccount) cachedAccount = new Account(client);
  return cachedAccount;
};

export { ID, Query };
