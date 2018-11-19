/**
 * Schema of DownloadType
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'
import { DownloadType } from '../models'

/* TODO: review generated schema */
export default (model: DownloadType): Schema => ({
  idDownloadTypePk: {
    content: model.idDownloadTypePk,
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
