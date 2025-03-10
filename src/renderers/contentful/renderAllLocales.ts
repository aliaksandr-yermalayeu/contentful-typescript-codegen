import renderUnion from "../typescript/renderUnion"
import { Locale } from "contentful"

export default function renderAllLocales(locales: Locale[]): string {
  return renderUnion(
    "LocaleCode",
    locales.map(locale => `'${locale.code}'`),
  )
}
