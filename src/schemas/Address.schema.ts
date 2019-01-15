/**
 * Schema of Address
 * @author Simpli CLI generator
 */
import { InputType, Schema } from '../simpli'
import { bool, cep } from '../simpli'
import { Address } from '../models'

/* TODO: review generated schema */
export default (model: Address): Schema => ({
  idAddressPk: {
    content: model.idAddressPk,
    editable: false,
  },

  zipcode: {
    content: cep(model.zipcode),
    input: InputType.CEP,
    meta: {
      required: true,
    },
  },

  street: {
    content: model.street,
    input: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  number: {
    content: model.number,
    input: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  complement: {
    content: model.complement,
    input: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },

  city: {
    content: model.city,
    input: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  state: {
    content: model.state,
    input: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  latitude: {
    content: model.latitude,
    input: InputType.NUMBER,
    meta: {
      required: true,
      step: 'any',
    },
  },

  longitude: {
    content: model.longitude,
    input: InputType.NUMBER,
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
