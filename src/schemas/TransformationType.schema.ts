/**
 * Schema of TransformationType
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool } from '../simpli'
import { TransformationType } from '../models'

/* TODO: review generated schema */
export default (model: TransformationType): Schema => ({
  idTransformationTypePk: {
    content: model.idTransformationTypePk,
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

  combiner: {
    content: bool(model.combiner),
    input: InputType.CHECKBOX,
  },

  active: {
    content: bool(model.active),
    hidden: true,
    editable: false,
  },
})
