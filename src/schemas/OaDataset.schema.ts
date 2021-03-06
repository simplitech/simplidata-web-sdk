/**
 * Schema of OaDataset
 * @author Simpli CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool, datetime } from '../simpli'
import { OaDataset } from '../models'

export default (model: OaDataset): Schema => ({
  oaVersion: {
    content: model.oaVersion && model.oaVersion.$id,
    input: InputType.SELECT,
  },

  idOaDatasetPk: {
    content: model.idOaDatasetPk,
    editable: false,
  },

  creationDate: {
    content: datetime(model.creationDate),
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
