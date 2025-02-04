const {Schema, model} = require('mongoose');
const Joi = require('joi');

const {handleSaveError} = require('../helpers');

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  }, {versionKey: false, timestamps: true})

  userSchema.post('save', handleSaveError)

  const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
  });

  const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
  });
  
  const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
  });

  const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required()
  })

  const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    emailSchema,
  }

  const User = model('user', userSchema);

  module.exports = {
    schemas,
    User,
  }