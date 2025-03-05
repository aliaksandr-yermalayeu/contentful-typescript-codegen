export default function renderInterface({
  name,
  extension,
  fields,
  description,
  type,
}: {
  name: string
  extension?: string
  fields?: string
  description?: string
  type?: string
}) {
  return `
    ${description ? `/** ${description} */` : ""}
    export type ${name} = ${
    type
      ? `${type}`
      : `{
      ${fields}
    }`
  }
    ${extension ? `& ${extension}` : ""}
  `
}
