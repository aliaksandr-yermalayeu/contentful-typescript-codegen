import { Locale } from "contentful"

export default function renderDefaultLocale(locales: Locale[]): string {
  const defaultLocale = locales.find(locale => locale.default)

  if (!defaultLocale) {
    throw new Error("Could not find a default locale in Contentful.")
  }

  return `export type ContentfulDefaultLocaleCode = '${defaultLocale.code}';`
}
