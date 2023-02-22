import {Schema,model} from "mongoose";

interface IProduct{
    name:string;
    price:number;
    producer:string;
    avatar:string
}


const productSchema = new Schema<IProduct>({
    name:String,
    price:Number,
    producer:String,
    avatar:String
})

const Product=model<IProduct>('Product',productSchema);
export {Product};
