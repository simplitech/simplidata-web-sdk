/**
 * Schema of User
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool, datetime } from '../simpli'
import { User } from '../models'

/* TODO: review generated schema */
export default (model: User): Schema => ({
  address: {
    content: model.address && model.address.$id,
    input: InputType.SELECT,
  },

  idUserPk: {
    content: model.idUserPk,
    editable: false,
  },

  email: {
    content: model.email,
    input: InputType.EMAIL,
    meta: {
      required: true,
    },
  },

  password: {
    content: model.password,
    hidden: true,
    input: InputType.PASSWORD,
    meta: {
      required: true,
    },
  },

  name: {
    content: model.name,
    input: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  primaryPhone: {
    content: model.primaryPhone,
    input: InputType.PHONE,
    meta: {
      required: true,
    },
  },

  primaryPhoneRegion: {
    content: model.primaryPhoneRegion,
    input: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  primaryPhoneNumber: {
    content: model.primaryPhoneNumber,
    input: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  personalDocument: {
    content: model.personalDocument,
    input: InputType.CPF,
    meta: {
      maxlength: '255',
    },
  },

  corporateDocument: {
    content: model.corporateDocument,
    input: InputType.CNPJ,
    meta: {
      maxlength: '255',
    },
  },

  corporateName: {
    content: model.corporateName,
    input: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  tradingName: {
    content: model.tradingName,
    input: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  creationDate: {
    content: datetime(model.creationDate),
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
