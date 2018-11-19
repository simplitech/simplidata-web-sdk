/**
 * Schema of UserUsedOa
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { datetime } from 'simpli-web-sdk'
import { UserUsedOa } from '../models'

/* TODO: review generated schema */
export default (model: UserUsedOa): Schema => ({
  objectOfAnalysis: {
    content: model.objectOfAnalysis && model.objectOfAnalysis.$id,
    input: InputType.SELECT,
  },

  user: {
    content: model.user && model.user.$id,
    input: InputType.SELECT,
  },
})
