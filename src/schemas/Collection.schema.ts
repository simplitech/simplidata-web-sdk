/**
 * Schema of Collection
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { bool, datetime } from 'simpli-web-sdk'
import { Collection } from '../models'

/* TODO: review generated schema */
export default (model: Collection): Schema => ({
  user: {
    content: model.user && model.user.$id,
    inputType: InputType.SELECT,
  },

  idCollectionPk: {
    content: model.idCollectionPk,
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
