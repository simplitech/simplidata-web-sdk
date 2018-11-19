/**
 * Schema of News
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { RenderAnchor, bool, datetime } from 'simpli-web-sdk'
import { News } from '../models'

/* TODO: review generated schema */
export default (model: News): Schema => ({
  // oaCategory: {
  //   content: model.oaCategory && model.oaCategory.$id,
  //   input: InputType.SELECT,
  // },

  idNewsPk: {
    content: model.idNewsPk,
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

  dataCreation: {
    content: datetime(model.dataCreation),
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
