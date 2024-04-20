import mongo from "mongoose"
const product_info=new mongo.Schema({
    userid: {
        type:String,
        required: true
    },
    product_name:{
        type:String,
        required:true,
    },
    product_description:{
        type:String,
        required:true,
    },
    product_price:{
    type:String,
    required:true,
    },
    product_imgurl: {
        type: String,
        required: true
    },
    product_origin:{
        type:String,
        required:true
    },
    product_type:{
        type:String,
        required:true
    }
})
export default mongo.model("2)Product",product_info)