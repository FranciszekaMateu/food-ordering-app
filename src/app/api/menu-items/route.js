import {MenuItem} from '../../../models/MenuItem.js';
import mongoose from 'mongoose';
export async function POST(req){
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const menuItemDoc = await MenuItem.create(data);
  return Response.json(menuItemDoc);
}
export async function GET(){
  mongoose.connect(process.env.MONGO_URL);
  const menuItems = await MenuItem.find();
  return Response.json(menuItems);
}
export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL); 
  const {_id,...data} = await req.json();
  await MenuItem.findByIdAndUpdate(_id,data);
  return Response.json(true);
}
