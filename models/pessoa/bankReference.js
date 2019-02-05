const mongoose = require('mongoose');

const BankReferenceSchema = new mongoose.Schema({
    bank_reference_id: {
      type: Number,
      required: [true, 'o id da referência bancária é obrigatório']
    },
    bank_code: { type: Number },
    agency_code: { type: String },
    account_number: { type: Number },
    account_type: { type: Number },
    open_date: { type: Date },
    bank_bond_date: { type: Date },
    credit_limit: { type: Number },
    second_cpf: { type: Number },
    edited: { type: Date }
});

module.exports.BankReference = mongoose.model('bankReference', BankReferenceSchema, 'bankReferences');