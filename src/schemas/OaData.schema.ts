/**
 * Schema of OaData
 * @author Simpli CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool, datetime } from '../simpli'
import { OaData } from '../models'

/* TODO: review generated schema */
export default (model: OaData): Schema => ({
  oaDataset: {
    content: model.oaDataset && model.oaDataset.$id,
    input: InputType.SELECT,
  },

  idOaDataPk: {
    content: model.idOaDataPk,
    editable: false,
  },

  value: {
    content: model.value,
    input: InputType.CURRENCY,
    meta: {
      required: true,
    },
  },

  dt: {
    content: datetime(model.dt),
    input: InputType.DATETIME,
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
