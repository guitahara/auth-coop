'use strict'
const mongoose = require('mongoose');

const StageSchema = new mongoose.Schema({
  stage_id: { type: String },
  dt_inclusion: { type: Date},
  cpf: { type: String },
  name: { type: String },
  degree: { type: String }, //grau de instrução
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
  social_name: { type: String },
  origin: { type: String },
  origin_id: { type: String },
  origin_date: { type: String },
  origin_DQ_date: { type: String }, //data da inclusão/ultima alteração na origem
  origin_DQ_last_date: { type: String }, //ultima data em que o registro passou pelo processo de data quality
  status_DQ: { type: String }, //status utilizado para o processo de data quality
  is_prospect: { type: Boolean},

  //telefone
  telephone: [{
    number_stage_id: { type: String }, //IDENTIFICADOR DA PESSOA NO STAGE NA QUAL O TELEFONE É VINCULADO
    cod_ddi: { type: String },
    cod_ddd: { type: String },
    number: { type: String },
    ramal: { type: String },
    number_type: { type: Number },
    principal: { type: Boolean }
  }],

  //email
  email: [{
    email_stage_id: { type: String },
    email_address: { type: String },
    mail_type: { type: String },
    principal: { type: Boolean }
  }],

  //address
  address: [{
    adress_stage_id: { type: String },
    address_type: { type: Number },
    cep: { type: String },
    street_type: { type: String },
    street: { type: String },
    number: { type: Number },
    complement: { type: String },
    description: { type: String },
    neighborhood: { type: String },
    city: { type: String},
    principal: { type: Boolean }
  }]
});

module.exports.Stage = mongoose.model('stage', StageSchema, 'stages');