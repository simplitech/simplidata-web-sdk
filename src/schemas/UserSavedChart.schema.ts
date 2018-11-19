/**
 * Schema of UserSavedChart
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { bool, datetime } from 'simpli-web-sdk'
import { UserSavedChart } from '../models'

/* TODO: review generated schema */
export default (model: UserSavedChart): Schema => ({
  collection: {
    content: model.collection && model.collection.$id,
    input: InputType.SELECT,
  },

  downloadType: {
    content: model.downloadType && model.downloadType.$id,
    input: InputType.SELECT,
  },

  user: {
    content: model.user && model.user.$id,
    input: InputType.SELECT,
  },

  idUserChartPk: {
    content: model.idUserChartPk,
    editable: false,
  },

  json: {
    content: model.json,
    input: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
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
