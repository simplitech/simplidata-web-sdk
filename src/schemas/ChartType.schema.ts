/**
 * Schema of ChartType
 * @author Simpli CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool } from '../simpli'
import { ChartType } from '../models'

export default (model: ChartType): Schema => ({
  oaChartTypeAvailability: {
    hidden: true,
    input: InputType.SELECT,
  },

  idChartTypePk: {
    content: model.idChartTypePk,
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
