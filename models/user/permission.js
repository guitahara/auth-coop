'use strict'

const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    system: {type:String, required:true},
    roles: [{type:String,required:false}]
});

module.exports = mongoose.model('permission',PermissionSchema,'permissions');