import vine from '@vinejs/vine'

const projectSchema = vine.object({
  name: vine.string().trim().minLength(1).maxLength(255),
})

export const createProjectValidator = vine.compile(projectSchema)
export const updateProjectValidator = vine.compile(projectSchema)
