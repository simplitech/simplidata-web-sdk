/**
 * Schema of Address
 * @author Simpli© CLI generator
 */
import { InputType, Schema } from 'simpli-web-sdk'
import { bool, cep } from 'simpli-web-sdk'
import { Address } from '../models'

/* TODO: review generated schema */
export default (model: Address): Schema => ({
  idAddressPk: {
    content: model.idAddressPk,
    editable: false,
  },

  zipcode: {
    content: cep(model.zipcode),
    inputType: InputType.CEP,
    meta: {
      required: true,
    },
  },

  street: {
    content: model.street,
    inputType: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  number: {
    content: model.number,
    inputType: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  complement: {
    content: model.complement,
    inputType: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  city: {
    content: model.city,
    inputType: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  state: {
    content: model.state,
    inputType: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  latitude: {
    content: model.latitude,
    inputType: InputType.NUMBER,
    meta: {
      required: true,
      step: 'any',
    },
  },

  longitude: {
    content: model.longitude,
    inputType: InputType.NUMBER,
    meta: {
      required: true,
      step: 'any',
    },
  },

  active: {
    content: bool(model.active),
    hidden: true,
    editable: false,
  },
})
