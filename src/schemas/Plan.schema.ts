/**
 * Schema of Plan
 * @author Simpli CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool } from '../simpli'
import { Plan } from '../models'

export default (model: Plan): Schema => ({
  idPlanPk: {
    content: model.idPlanPk,
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

  gatewayId: {
    content: model.gatewayId,
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
