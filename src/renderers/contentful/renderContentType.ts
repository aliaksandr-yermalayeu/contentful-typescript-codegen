import { ContentType, Field, FieldType } from "contentful"

import renderInterface from "../typescript/renderInterface"
import renderField from "./renderField"
import renderContentTypeId from "./renderContentTypeId"

import renderArray from "./fields/renderArray"
import renderBoolean from "./fields/renderBoolean"
import renderLink from "./fields/renderLink"
import renderLocation from "./fields/renderLocation"
import renderNumber from "./fields/renderNumber"
import renderObject from "./fields/renderObject"
import renderRichText from "./fields/renderRichText"
import renderSymbol from "./fields/renderSymbol"

export default function renderContentType(contentType: ContentType, localization: boolean): string {
  const name = renderContentTypeId(contentType.sys.id)
  const fields = renderContentTypeFields(contentType.fields, localization)

  return `
    ${renderInterface({ name: `${name}Fields`, fields })}
    ${renderInterface({ name, type: `Entry<${name}Fields>` })}
  `
}

function renderContentTypeFields(fields: Field[], localization: boolean): string {
  return fields
    .filter(field => !field.omitted)
    .map<string>(field => {
      const functionMap: Record<FieldType | "ResourceLink", (field: Field) => string> = {
        Array: renderArray,
        Boolean: renderBoolean,
        Date: renderSymbol,
        Integer: renderNumber,
        Link: renderLink,
        Location: renderLocation,
        Number: renderNumber,
        Object: renderObject,
        ResourceLink: renderLink,
        RichText: renderRichText,
        Symbol: renderSymbol,
        Text: renderSymbol,
      }

      return renderField(field, functionMap[field.type](field), localization)
    })
    .join("\n")
}
