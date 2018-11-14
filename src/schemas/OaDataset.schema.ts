/**
 * Schema of OaDataset
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { bool, datetime } from 'simpli-web-sdk'
import { OaDataset } from '../models'

/* TODO: review generated schema */
export default (model: OaDataset): Schema => ({
  oaVersion: {
    content: model.oaVersion && model.oaVersion.$id,
    inputType: InputType.SELECT,
  },

  idOaDatasetPk: {
    content: model.idOaDatasetPk,
    editable: false,
  },

  creationDate: {
    content: datetime(model.creationDate),
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
