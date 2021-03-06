/**
 * Schema of OaVersion
 * @author Simpli CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool } from '../simpli'
import { OaVersion } from '../models'

export default (model: OaVersion): Schema => ({
  oaVersionStatus: {
    content: model.oaVersionStatus && model.oaVersionStatus.$id,
    input: InputType.SELECT,
  },

  idOaVersionPk: {
    content: model.idOaVersionPk,
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
