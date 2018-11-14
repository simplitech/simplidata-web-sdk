/**
 * Schema of ObjectOfAnalysis
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { bool, datetime } from 'simpli-web-sdk'
import { ObjectOfAnalysis } from '../models'

/* TODO: review generated schema */
export default (model: ObjectOfAnalysis): Schema => ({
  // category: {
  //   content: model.category && model.category.$id,
  //   inputType: InputType.SELECT,
  // },

  periodicity: {
    content: model.periodicity && model.periodicity.$id,
    inputType: InputType.SELECT,
  },

  source: {
    content: model.source && model.source.$id,
    inputType: InputType.SELECT,
  },

  unity: {
    content: model.unity && model.unity.$id,
    inputType: InputType.SELECT,
  },

  plan: {
    content: model.plan && model.plan.$id,
    inputType: InputType.SELECT,
  },

  user: {
    content: model.user && model.user.$id,
    inputType: InputType.SELECT,
  },

  oaChartTypeAvailability: {
    hidden: true,
    inputType: InputType.SELECT,
  },

  oaMatchModel: {
    hidden: true,
    inputType: InputType.SELECT,
  },

  oaMatchOa: {
    hidden: true,
    inputType: InputType.SELECT,
  },

  idObjectOfAnalysisPk: {
    content: model.idObjectOfAnalysisPk,
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

  urlFile: {
    content: model.urlFile,
    inputType: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  urlThumbnail: {
    content: model.urlThumbnail,
    inputType: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  comment: {
    content: model.comment,
    inputType: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  idFromSource: {
    content: model.idFromSource,
    inputType: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  lastUpdate: {
    content: datetime(model.lastUpdate),
    inputType: InputType.DATETIME,
  },

  active: {
    content: bool(model.active),
    hidden: true,
    editable: false,
  },
})
