"use client";

import { Globe } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  applyTranslateLanguage,
  parseTranslateCookie,
  SOURCE_LANGUAGE,
  type TranslateLanguage,
  translateLanguages,
} from "@/lib/translate";

const subscribe = () => () => {};
const readLanguage = () => parseTranslateCookie(document.cookie);
const serverLanguage = () => SOURCE_LANGUAGE;

/** Header control that translates the whole page into the visitor's language. */
export function LanguageSwitcher() {
  const language = useSyncExternalStore(
    subscribe,
    readLanguage,
    serverLanguage
  );

  return (
    <div className="notranslate" translate="no">
      <Select
        value={language}
        items={translateLanguages}
        onValueChange={value => {
          if (value && value !== language)
            applyTranslateLanguage(value as TranslateLanguage);
        }}
      >
        <SelectTrigger
          aria-label="Translate this page"
          className="h-10 gap-1.5 border-sage px-2.5 text-xs font-bold text-forest-deep data-[size=default]:h-10"
        >
          <Globe className="size-4 text-forest" aria-hidden="true" />
          <span className="hidden sm:inline">
            <SelectValue />
          </span>
        </SelectTrigger>
        <SelectContent
          align="end"
          alignItemWithTrigger={false}
          className="min-w-44"
        >
          {translateLanguages.map(option => (
            <SelectItem
              key={option.value}
              value={option.value}
              lang={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
