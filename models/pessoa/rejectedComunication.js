const mongoose = require('mongoose');

const RejectedComunicationSchema = new mongoose.Schema({
        people_id: { //IDENTIFICADOR DA PESSOA FISICA OU JURIDICA
          type: Number,
          required: [true, "O código identificador de pessoa fisica ou jurídica é obrigatório"]
        },
        cod_communication_means: [{type:Number}],
        edited: { type: Date }
});

module.exports.RejectedComunication = mongoose.model('rejectedComunication',RejectedComunicationSchema, 'rejectedComunications') 