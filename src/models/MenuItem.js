import {Schema,models, model} from 'mongoose';
const MenuItemSchema = new Schema({
   image:{
      type: String,
      required: true,
   }, 
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    basePrice:{
        type: Number,
        required: true,
    },

},{timestamps: true});
export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
