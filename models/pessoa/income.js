const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
        income_id: {
          type: Number,
          required: [true, 'O id da renda é obrigatório']
        },
        income_name: { type: String },
        income_type: { type: Number },
        value: { type: Number },
        cod_approve: { type: Number },
        status: { type: Number },
        edited: { type: Date }
});

module.exports.IncomeSchema = mongoose.model('income',IncomeSchema,'incomes');