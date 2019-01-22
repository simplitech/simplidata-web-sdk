/**
 * Schema of DownloadType
 * @author Simpli CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool } from '../simpli'
import { DownloadType } from '../models'

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
