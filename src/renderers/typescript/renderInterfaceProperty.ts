export default function renderInterfaceProperty(
  name: string,
  type: string,
  required: boolean,
  localization: boolean,
  description?: string,
): string {
  return [
    name,
    required ? "" : "?",
    ": ",
    localization ? `LocalizedField<${type}>` : type,
    required ? "" : " | undefined",
    ";",
  ].join("")
}
