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
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true
    },
    verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
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
    subscription: Joi.string(),
});

const loginJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});

const updateSubscriptionJoiSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
})

module.exports = {
    User,
    signupJoiSchema,
    loginJoiSchema,
    updateSubscriptionJoiSchema
}