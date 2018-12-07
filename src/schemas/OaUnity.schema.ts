/**
 * Schema of OaUnity
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool } from '../simpli'
import { OaUnity } from '../models'

/* TODO: review generated schema */
export default (model: OaUnity): Schema => ({
  idOaUnityPk: {
    content: model.idOaUnityPk,
    editable: false,
  },

  title: {
    content: model.title,
    input: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  active: {
    content: bool(model.active),
    hidden: true,
    editable: false,
  },
})
