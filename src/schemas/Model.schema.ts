/**
 * Schema of Model
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'
import { Model } from '../models'

/* TODO: review generated schema */
export default (model: Model): Schema => ({
  oaMatchModel: {
    hidden: true,
    inputType: InputType.SELECT,
  },

  idModelPk: {
    content: model.idModelPk,
    editable: false,
  },

  title: {
    content: model.title,
    inputType: InputType.TEXT,
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
