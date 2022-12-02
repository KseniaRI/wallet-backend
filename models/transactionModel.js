const { Schema, model } = require('mongoose');
const Joi = require('joi').extend(require('@joi/date'));;

// const moment = require('moment');

const transactionSchema = Schema({
    category: {
      type: String,
      enum: ["Laisure", "Main", "Food", "Education", "Salary", "Home", "Car", "Children", "The rest"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
  },
    date: {
      // type: Date,
      type: String,
      // default: moment().format("DD.MM.YYYY"),
      required: true,
    },
    comment: {
      type: String,
    },
    type: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
}, { versionKey: false, timestamps: true });

const Transaction = model("transaction", transactionSchema);
  
const transactionJoiSchema = Joi.object({
            category: Joi.string(),
            amount: Joi.number().positive(),
            comment: Joi.string(),
            type: Joi.bool(),
            // date: Joi.date().format(['DD.MM.YYYY']).required(),
            date: Joi.string(),
});

module.exports = {
  transactionJoiSchema,
  Transaction,
}
