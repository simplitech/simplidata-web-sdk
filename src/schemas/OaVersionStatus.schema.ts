/**
 * Schema of OaVersionStatus
 * @author Simpli CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool } from '../simpli'
import { OaVersionStatus } from '../models'

export default (model: OaVersionStatus): Schema => ({
  idOaVersionStatusPk: {
    content: model.idOaVersionStatusPk,
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
