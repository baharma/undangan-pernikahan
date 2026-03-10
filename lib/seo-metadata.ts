const DEFAULT_SITE_URL = "https://pawiwahan-dedi-listya.my.id";

const withLeadingSlash = (value: string) => (value.startsWith("/") ? value : `/${value}`);

const normalizeSiteUrl = (value?: string) => {
  const trimmedValue = value?.trim();
  const candidate = trimmedValue
    ? /^https?:\/\//i.test(trimmedValue)
      ? trimmedValue
      : `https://${trimmedValue}`
    : DEFAULT_SITE_URL;

  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
};

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const METADATA_BASE = new URL(SITE_URL);
export const toAbsoluteUrl = (path: string) => `${SITE_URL}${withLeadingSlash(path)}`;
