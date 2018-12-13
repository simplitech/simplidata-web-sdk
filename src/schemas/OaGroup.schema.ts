/**
 * Schema of OaGroup
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool } from '../simpli'
import { OaGroup } from '../models'

/* TODO: review generated schema */
export default (model: OaGroup): Schema => ({
  // oaGroup: {
  //   content: model.oaGroup && model.oaGroup.$id,
  //   input: InputType.SELECT,
  // },

  idOaGroupPk: {
    content: model.idOaGroupPk,
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
