/**
 * Schema of OaGroup
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'
import { OaGroup } from '../models'

/* TODO: review generated schema */
export default (model: OaGroup): Schema => ({
  // oaGroup: {
  //   content: model.oaGroup && model.oaGroup.$id,
  //   inputType: InputType.SELECT,
  // },

  idOaGroupPk: {
    content: model.idOaGroupPk,
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

  active: {
    content: bool(model.active),
    hidden: true,
    editable: false,
  },
})
