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
  //   input: InputType.SELECT,
  // },

  periodicity: {
    content: model.periodicity && model.periodicity.$id,
    input: InputType.SELECT,
  },

  source: {
    content: model.source && model.source.$id,
    input: InputType.SELECT,
  },

  unity: {
    content: model.unity && model.unity.$id,
    input: InputType.SELECT,
  },

  plan: {
    content: model.plan && model.plan.$id,
    input: InputType.SELECT,
  },

  user: {
    content: model.user && model.user.$id,
    input: InputType.SELECT,
  },

  oaChartTypeAvailability: {
    hidden: true,
    input: InputType.SELECT,
  },

  oaMatchModel: {
    hidden: true,
    input: InputType.SELECT,
  },

  oaMatchOa: {
    hidden: true,
    input: InputType.SELECT,
  },

  idObjectOfAnalysisPk: {
    content: model.idObjectOfAnalysisPk,
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

  urlFile: {
    content: model.urlFile,
    input: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  urlThumbnail: {
    content: model.urlThumbnail,
    input: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  comment: {
    content: model.comment,
    input: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  idFromSource: {
    content: model.idFromSource,
    input: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  lastUpdate: {
    content: datetime(model.lastUpdate),
    input: InputType.DATETIME,
  },

  active: {
    content: bool(model.active),
    hidden: true,
    editable: false,
  },
})
