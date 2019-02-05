'use strict'

const mongoose = require('mongoose');
const types = mongoose.Types;
const Permission = require('./permission');

const UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    login: {type:String, required:true},
    password: {type:String, required:true},
    permissions: [{type:Permission.schema, required:false}],
    clientId: {type:types.ObjectId, required:false, ref:'cliente'},
    prospectId: {type: types.ObjectId, required:false, ref:'prospect'},
    createdAt: {type: Date, default:Date.now},
    editedAt: {type:Date, required:false}
});

module.exports = mongoose.model('user',UserSchema,'users');