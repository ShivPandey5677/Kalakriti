import mongo from "mongoose"
const bidder_info=mongo.Schema({
    userid: {
        type:String,
        required: true
    },
    product_id:{
        type:String,
        required:true,
    },
    product_img:{
        type:String,
        required:true,
    },
    product_name:{
        type:String,
        required:true,
    },
    bidder_name:{
        type:String,
        required:true,
    },
    bidder_price:{
        type:String,
        required:true,
    }
   
})
export default mongo.model("3)Bidder",bidder_info)