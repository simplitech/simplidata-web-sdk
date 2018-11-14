/**
 * Schema of OaData
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { bool, datetime } from 'simpli-web-sdk'
import { OaData } from '../models'

/* TODO: review generated schema */
export default (model: OaData): Schema => ({
  oaDataset: {
    content: model.oaDataset && model.oaDataset.$id,
    inputType: InputType.SELECT,
  },

  idOaDataPk: {
    content: model.idOaDataPk,
    editable: false,
  },

  value: {
    content: model.value,
    inputType: InputType.CURRENCY,
    meta: {
      required: true,
    },
  },

  dt: {
    content: datetime(model.dt),
    inputType: InputType.DATETIME,
    meta: {
      required: true,
    },
  },

  active: {
    content: bool(model.active),
    hidden: true,
    editable: false,
  },
})
