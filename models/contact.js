const {Schema, model} = require('mongoose');

const Joi = require('joi');

const {handleSaveError} = require('../helpers');

const addSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  }, {versionKey: false, timestamps: true});


  addSchema.post('save', handleSaveError)

  const contactSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': `"name" should be a type of 'string'`,
      'any.required': `"name" is a required field`
    }),
    email: Joi.string().required().messages({
        'string.base': `"email" should be a type of 'string'`,
        'any.required': `"email" is a required field`
      }),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });

  const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
  })

  const schemas = {
    contactSchema,
    updateFavoriteSchema,
  }

  const Contact = model('contact', addSchema);

  module.exports = {
    Contact,
    schemas,
};