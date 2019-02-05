'use strict'
const mongoose = require('mongoose');
const Income = require('./income');

const PrivateIndividualSchema = new mongoose.Schema({
    _id: false,
    people_id: {
      type: String,
      trim: true,
      required: [true, 'O código identificador da pessoa fisica é obrigatório']
    },
    cpf: {
      type: String,
      trim: true,
      required: [true, 'O cpf é obrigatório']
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'O nome do cooperado é obrigatório']
    },
    first_name: { type: String },
    degree: { type: String },
    civil_status: { type: String },
    ocupation: { type: String },
    career: { type: String }, //profissão
    sex: { type: String },
    born_date: { type: Date },
    document_rg: { type: String },
    sigla_rg: { type: String },
    document_issue_date: { type: Date }, //data de emissão do rg
    document_uf: { type: String },
    document_uf_emited: { type: String }, //uf de emissão do documento
    born_country: { type: String },
    born_city: { type: String },
    mother_name: { type: String },
    father_name: { type: String },
    emancipated: { type: String },
    income_range: { type: String },
    cpf_valid: { type: Number },
    social_name: { type: String },
    //RENDA
    income =[{type:Income, required:false}]
  })

  module.exports.PrivateIndividual = mongoose.model('privateIndividual', PrivateIndividualSchema, 'privateIndividuals');