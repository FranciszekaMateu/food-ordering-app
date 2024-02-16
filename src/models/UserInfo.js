import mongoose from 'mongoose';
import {model, models} from 'mongoose';
const UserInfoSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
  address : {type: String},
  postal: {type: String},
  city : {type: String},
  phone : {type: String},
  country : {type: String},
  admin : {type: Boolean,default: false}
}, {timestamps: true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);
