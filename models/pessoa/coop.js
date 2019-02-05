const mongoose = require('mongoose');

const CoopSchema = new mongoose.Schema({  
  register_number: {
    type: Number,
    required: [true, "O número da matrícula do cooperado é obrigatório"]
  },
  admission_date: {
    type: Date,
    required: [true, "A data de admissão do cooperado é obrigatória"]
  },
  resignation_date: { type: Date },
  obs: { type: String },
  first_purchase_date: { type: Date },
  cod_canal: {
    type: Number,
    required: [true, "O código identificador do canal de origem do cadastro do cooperado é obrigatório"]
  },
  cod_admission_store: {
    type: Number,
    required: [true, "O código da loja responsável pela captação do cooperado é obrigatório"]
  },
  cod_register_store: { type: Number },
  coop_status: {
    type: String,
    required: [true, "O status cadastral do cooperado é obrigatório"]
  },
  cod_reason_status: { type: String },
  funeral_payment_date: { type: Date },
  register_number_transf: { type: Number },
  cod_fraud: { type: String },
  edited: { type: Date },
  cod_reason_association: { type: Number },
  cod_descript_reason_association: { type: String },
  cod_know_coop: { type: Number },
  dsc_other_coop: { type: String },
  register_number_indication: { type: Number },
  privacy_policy: { type: String },
  privacy_policy_date: { type: Date },
  credit_policy: { type: String }
});

module.exports.Coop = mongoose.model('coop',CoopSchema,'coops')