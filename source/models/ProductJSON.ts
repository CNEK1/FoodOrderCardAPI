import mongoose from "mongoose";
import { Schema } from "mongoose";
import IProductJSON from "../interface/IProductJSON";

const ProductJSONSchema: Schema = new Schema({
    title: {type: String,required:true},
    cost: {type: Number, required: true},
    like: {type: Boolean, required: true},
    amount: {type: Number, required: true},
    order: {type: Number, required: true},
},{
    timestamps: true
}); 

export default mongoose.model<IProductJSON>('Products',ProductJSONSchema);