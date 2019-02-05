const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    job_id: {
      type: Number,
      required: [true, "O id do emprego é necessário"]
    },
    company_register_code: {
      type: Number,
      required: [true, "O código de identificação do empregado na empresa é obrigatório"]
    },
    company_name: {
      type: String,
      required: [true, "o nome da empresa é obrigatório"]
    },
    admission_date: { type: Date },
    company_resignation_date: { type: Date },
    company_cnpj: { type: Number },
    status: { type: Number },
    company_created: { type: Date },
    company_edited: { type: Date }
  });

  module.exports.Job = mongoose.model('job',JobSchema,'jobs');