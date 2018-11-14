/**
 * Schema of User
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { bool, datetime } from 'simpli-web-sdk'
import { User } from '../models'

/* TODO: review generated schema */
export default (model: User): Schema => ({
  address: {
    content: model.address && model.address.$id,
    inputType: InputType.SELECT,
  },

  idUserPk: {
    content: model.idUserPk,
    editable: false,
  },

  email: {
    content: model.email,
    inputType: InputType.EMAIL,
    meta: {
      required: true,
    },
  },

  password: {
    content: model.password,
    hidden: true,
    inputType: InputType.PASSWORD,
    meta: {
      required: true,
    },
  },

  name: {
    content: model.name,
    inputType: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  primaryPhone: {
    content: model.primaryPhone,
    inputType: InputType.PHONE,
    meta: {
      required: true,
    },
  },

  primaryPhoneRegion: {
    content: model.primaryPhoneRegion,
    inputType: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  primaryPhoneNumber: {
    content: model.primaryPhoneNumber,
    inputType: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  personalDocument: {
    content: model.personalDocument,
    inputType: InputType.CPF,
    meta: {
      maxlength: '255',
    },
  },

  corporateDocument: {
    content: model.corporateDocument,
    inputType: InputType.CNPJ,
    meta: {
      maxlength: '255',
    },
  },

  corporateName: {
    content: model.corporateName,
    inputType: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  tradingName: {
    content: model.tradingName,
    inputType: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  creationDate: {
    content: datetime(model.creationDate),
    inputType: InputType.DATETIME,
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
