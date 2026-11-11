/**
 * Page translation powered by the Google Translate website element.
 * The selected language lives in Google's own `googtrans` cookie
 * (format: "/en/<target>"), which the element reads on load.
 */

export const SOURCE_LANGUAGE = "en";

/** Offered languages, weighted toward the communities Century Financial Group serves. */
export const translateLanguages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "vi", label: "Tiếng Việt" },
  { value: "zh-CN", label: "中文 (简体)" },
  { value: "zh-TW", label: "中文 (繁體)" },
  { value: "ko", label: "한국어" },
  { value: "tl", label: "Tagalog" },
  { value: "ja", label: "日本語" },
  { value: "fa", label: "فارسی" },
  { value: "ar", label: "العربية" },
  { value: "hi", label: "हिन्दी" },
  { value: "fr", label: "Français" },
  { value: "pt", label: "Português" },
  { value: "ru", label: "Русский" },
] as const;

export type TranslateLanguage = (typeof translateLanguages)[number]["value"];

const isSupported = (value: string): value is TranslateLanguage =>
  translateLanguages.some((language) => language.value === value);

/** Reads the target language from a cookie header string. */
export function parseTranslateCookie(cookieString: string): TranslateLanguage {
  const match = cookieString.match(/(?:^|;\s*)googtrans=([^;]*)/);
  if (!match) return SOURCE_LANGUAGE;
  const target = decodeURIComponent(match[1]).split("/")[2] ?? "";
  return isSupported(target) ? target : SOURCE_LANGUAGE;
}

/** Cookie domains Google may have written to: host-only, the host, and the registrable parent. */
function cookieDomains(hostname: string) {
  const parts = hostname.split(".");
  const parent = parts.length > 2 ? `.${parts.slice(-2).join(".")}` : `.${hostname}`;
  return [undefined, hostname, parent];
}

/** Persists the chosen language and reloads so the element can translate the page. */
export function applyTranslateLanguage(language: TranslateLanguage) {
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  for (const domain of cookieDomains(window.location.hostname)) {
    document.cookie = `googtrans=; ${expired}; path=/${domain ? `; domain=${domain}` : ""}`;
  }
  if (language !== SOURCE_LANGUAGE) {
    document.cookie = `googtrans=/${SOURCE_LANGUAGE}/${language}; path=/; max-age=31536000; SameSite=Lax`;
  }
  window.location.reload();
}
