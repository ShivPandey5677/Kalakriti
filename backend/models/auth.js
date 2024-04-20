import mongo from "mongoose"
const R={
    type:String,
    required:true,
};
const auths=new mongo.Schema({
    username:R,
    email:R,
    password:R,
    name:R,
});
export default mongo.model("1)Auth",auths)