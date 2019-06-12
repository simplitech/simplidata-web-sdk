/**
 * Schema of MissingOaComplain
 * @author Simpli CLI generator
 */
import { InputType, Schema } from '../simpli'
import { RenderAnchor, bool, datetime } from '../simpli'
import { MissingOaComplain } from '../models'

export default (model: MissingOaComplain): Schema => ({
  idMissingOaComplainPk: {
    content: model.idMissingOaComplainPk,
    editable: false,
  },

  text: {
    content: model.text,
    input: InputType.TEXTAREA,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  creationDate: {
    content: datetime(model.creationDate),
    editable: false,
  },
})
