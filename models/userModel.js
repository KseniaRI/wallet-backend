const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Email is required'],
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true
    },
    balance: {
      type: Number,
      default: 0
  }
}, { versionKey: false, timestamps: true });

userSchema.methods.setPassword = function(password){
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User = model('user', userSchema);

const signupJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string(),
});

const loginJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});

module.exports = {
    User,
    signupJoiSchema,
    loginJoiSchema,
}