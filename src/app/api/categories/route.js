import {Category} from '@/models/Categories';
import mongoose from 'mongoose';
export async function POST(req){

  mongoose.connect(process.env.MONGO_URL);
  const {name} = await req.json();
  const categoryDoc=  await Category.create({name});
  return Response.json(categoryDoc);
}    
export async function GET(){

  mongoose.connect(process.env.MONGO_URL);
  return Response.json(await Category.find({}).lean());
}
export async function PUT(req){

  mongoose.connect(process.env.MONGO_URL);
  const {_id,name} = await req.json();
  const categoryDoc =await Category.updateOne({_id},{name});
  return Response.json(categoryDoc);
}
