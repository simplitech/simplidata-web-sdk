/**
 * Schema of OaSource
 * @author Simpli CLI generator
 */
import { InputType, Schema } from '../simpli'
import { RenderAnchor, bool } from '../simpli'
import { OaSource } from '../models'

export default (model: OaSource): Schema => ({
  idSourcePk: {
    content: model.idSourcePk,
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

  link: {
    content: {
      component: RenderAnchor,
      props: {
        href: model.link,
        label: model.link,
        target: '_black',
      },
    },
    textContent: model.link,
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
