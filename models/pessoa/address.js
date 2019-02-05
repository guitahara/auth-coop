const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    adress_id: {
      type: Number,
      required: [true, "O código identificador do endereço é obrigatório"]
    },
    address_type: {
      type: Number,
      required: [true, "O tipo do endereço é obrigatório"]
    },
    cep: { type: Number },
    street_type: { type: String },
    street: { type: String },
    number: { type: Number },
    complement: { type: String },
    description: { type: String },
    cod_neighborhood: { type: String },
    cod_city: { type: String },
    neighborhood: { type: String },
    cod_nixie: { type: Number },
    idt_houseHold: { type: Number },
    status: { type: Number },
    edited: { type: Date },
    principal: { type: String },
    activation_date: { type: Date },
    inactivation_date: { type: Date }
});

module.exports.Address = mongoose.model('address',AddressSchema,'addresses');