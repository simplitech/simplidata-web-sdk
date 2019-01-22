/**
 * Schema of Model
 * @author Simpli CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool } from '../simpli'
import { Model } from '../models'

export default (model: Model): Schema => ({
  oaMatchModel: {
    hidden: true,
    input: InputType.SELECT,
  },

  idModelPk: {
    content: model.idModelPk,
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
