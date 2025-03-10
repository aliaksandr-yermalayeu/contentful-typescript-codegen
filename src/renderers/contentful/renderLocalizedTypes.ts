/** renders helper types for --localization flag */
export default function renderLocalizedTypes(localization: boolean) {
  if (!localization) return null

  return `
    export type LocalizedField<T> = Partial<Record<LocaleCode, T>>
  
    // We have to use our own localized version of Asset because of a bug in contentful https://github.com/contentful/contentful.js/issues/208
    export type Asset {
      sys: Sys
      fields: {
        title: LocalizedField<string>
        description: LocalizedField<string>
        file: LocalizedField<{
          url: string
          details: {
            size: number
            image?: {
              width: number
              height: number
            }
          }
          fileName: string
          contentType: string
        }>
      }
      toPlainObject(): object
    }
  `
}
