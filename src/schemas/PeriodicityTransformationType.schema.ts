/**
 * Schema of PeriodicityTransformationType
 * @author Simpli CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool } from '../simpli'
import { PeriodicityTransformationType } from '../models'

export default (model: PeriodicityTransformationType): Schema => ({
  idPeriodicityTransformationTypePk: {
    content: model.idPeriodicityTransformationTypePk,
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
