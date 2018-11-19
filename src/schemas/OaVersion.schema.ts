/**
 * Schema of OaVersion
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'
import { OaVersion } from '../models'

/* TODO: review generated schema */
export default (model: OaVersion): Schema => ({
  oaVersionStatus: {
    content: model.oaVersionStatus && model.oaVersionStatus.$id,
    input: InputType.SELECT,
  },

  objectOfAnalysis: {
    content: model.objectOfAnalysis && model.objectOfAnalysis.$id,
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
