const mongoose = require('mongoose');

const ReferenceSchema = new mongoose.Schema({
    reference_id: {
      type: Number,
      required: [true, 'O id da referencia é obrigatório']
    },
    reference_type: { type: String },
    reference_name: { type: String },
    cod_ddd: { type: Number },
    number: { type: Number },
    res_cod_ddd: { type: Number },
    res_number: { type: Number },
    com_ddd: { type: Number },
    com_number: { type: Number },
    com_ramal: { type: Number },
    email: { type: String },
    edited: { type: Date }
});

module.exports.Refrence = mongoose.model('references',ReferenceSchema, 'references');