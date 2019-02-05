const mongoose = require('mongoose');
const Income = require('./income');

const LegalEntitySchema = new mongoose.Schema({
    _id: {type:Boolean},
    fantasy_name: { type: String },
    cod_ramo: { type: Number },
    corporate_name: { type: String },
    cnpj: { type: Number },
    ie_number: { type: String },
    cod_rms: { type: Number },
    dig_rms: { type: Number },
    url: { type: String },
    employees_qty: { type: Number },
    no_profit: { type: String },
    //RENDA
    income =[{type:Income}]
})

module.exports.LegalEntity = mongoose.model('legalEntity',LegalEntitySchema,'legalEntities')