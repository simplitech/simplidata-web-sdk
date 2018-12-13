/**
 * Schema of OaPeriodicity
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool } from '../simpli'
import { OaPeriodicity } from '../models'

/* TODO: review generated schema */
export default (model: OaPeriodicity): Schema => ({
  idOaPeriodicityPk: {
    content: model.idOaPeriodicityPk,
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
