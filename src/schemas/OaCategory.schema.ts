/**
 * Schema of OaCategory
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool } from '../simpli'
import { OaCategory } from '../models'

/* TODO: review generated schema */
export default (model: OaCategory): Schema => ({
  idOaCategoryPk: {
    content: model.idOaCategoryPk,
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
