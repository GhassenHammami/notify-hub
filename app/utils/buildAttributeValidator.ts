import vine from '@vinejs/vine'
import AttributeType from '#enums/attribute_type'
import Attribute from '#models/attribute'

export function buildAttributeValidator(attributes: Attribute[]) {
  const schemaObject: Record<string, any> = {}

  attributes.forEach((attr) => {
    let rule
    switch (attr.type) {
      case AttributeType.TEXT:
        rule = vine.string().minLength(1).maxLength(255)
        break
      case AttributeType.NUMBER:
        rule = vine.number()
        break
      case AttributeType.DATE:
        rule = vine.date()
        break
      default:
        rule = vine.string()
    }

    if (!attr.isRequired) {
      rule = rule.optional()
    }

    schemaObject[attr.name] = rule
  })

  return vine.compile(vine.object(schemaObject))
}
