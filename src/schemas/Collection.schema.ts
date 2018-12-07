/**
 * Schema of Collection
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool, datetime } from '../simpli'
import { Collection } from '../models'

/* TODO: review generated schema */
export default (model: Collection): Schema => ({
  user: {
    content: model.user && model.user.$id,
    input: InputType.SELECT,
  },

  idCollectionPk: {
    content: model.idCollectionPk,
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
