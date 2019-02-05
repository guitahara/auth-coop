'use strict'

const mongoose = require('mongoose');
const PrivateIndividual = require('./privateIndividual');
const LegalEntity = require('./legalEntity');
const Reference = require('./reference');
const BankReference = require('./bankReference');
const Phone = require('./phone');
const Email = require('./email');
const Address = require('./address');
const RejectedComunication = require('./rejectedComunication');
const Coop = require('./coop');
const Job = require('./job');

const PessoaSchema = new mongoose.Schema({
  //PESSOA
  idt_people: { type: String },
  cod_people_type: { type: String, required:true },
  cop_paper: { type: Number },
  edited: { type: Date },

  //Pessoa Física
  private_individual: {type:PrivateIndividual, required:false},

  //Pessoa Jurídica
  legal_entity: {type:LegalEntity, required:false},

  //Referencias
  reference: {type:Reference, required:false},

  //Referencias Bancarias
  bank_reference_id: {type:BankReference, required:false},
  
  //telefone
  telephone: [{type:Phone, required:false}],

  //email
  email: [{type:Email,required:false}],

  //address
  address: [{type:Address, required:false}],

  rejected_comunication: {type:RejectedComunication,required:false},

  //Cooperado
  coop:{type:Coop, required:false},

  //emprego
  job: [{type:Job, required:false}],

});

module.exports.Pessoa = mongoose.model('pessoa', PessoaSchema, 'pessoas');
