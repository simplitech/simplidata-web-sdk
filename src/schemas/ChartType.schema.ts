/**
 * Schema of ChartType
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'
import { ChartType } from '../models'

/* TODO: review generated schema */
export default (model: ChartType): Schema => ({
  oaChartTypeAvailability: {
    hidden: true,
    inputType: InputType.SELECT,
  },

  idChartTypePk: {
    content: model.idChartTypePk,
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
