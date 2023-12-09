export const pickProperties = (
  collection: Record<string, unknown>[],
  properties: string[]
): Record<string, unknown>[] => {
  return collection.map(item => {
    const newItem: Record<string, unknown> = {}

    properties.forEach(property => {
      newItem[property] = item[property]
    })

    return newItem
  })
}
