const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    email_id: {
      type: Number,
      required: [true, "O código identificador do email é obrigatório"]
    },
    email_address: {
      type: String,
      required: [true, "O endereço de email é obrigatório"]
    },
    email_type: { type: String },
    status: { type: Number },
    cod_engagement: { type: String },
    edited: {
      type: Date,
      required: [true, "A data da última alteração do regitro é obrigatória"]
    },
    principal: { type: String },
    activation_date: { type: Date },
    inactivation_date: { type: Date }
  })

  module.exports.Email = mongoose.model('email',EmailSchema,'emails');