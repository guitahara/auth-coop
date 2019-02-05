const mongoose = require('mongoose');

const PhoneSchema = new mongoose.Schema({
    telephone_id: {
      type: Number,
      required: [true, "O código identificador do telefone é obrigatório"]
    },
    cod_ddi: { type: Number },
    cod_ddd: { type: Number },
    number: {
      type: Number,
      required: [true, "O número de telefone é obrigatório"]
    },
    ramal: { type: Number },
    number_type: {
      type: Number,
      required: [true, "O tipo de número de telefone é obrigatório"]
    },
    operator_cod: { type: Number },
    status: { type: Number },
    edited: { type: Date },
    principal: { type: String },
    activation_date: { type: Date },
    inactivation_date: { type: Date }
});

module.exports.Phone = mongoose.model('phone',PhoneSchema,'phones');