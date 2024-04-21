import R1 from "../models/product.js"
import jwt from "jsonwebtoken";

export async function getProducts(req,res){
    const token=req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged In")
    jwt.verify(token,"secretkey",async(err,userInfo)=>{
      const RR1=await R1.find({
        userid:userInfo.id
      })
      if(RR1){
        return res.status(200).json(RR1);
      }
      return res.status(404).json("not found!!")
    } )
}
export async function addProducts(req, res) {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In");

    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid");

        const product = req.body[0];
        console.log(product);

        try {
            // Find the product in the database based on user ID and product name
            const existingProduct = await R1.findOne({
                userid: userInfo.id,
                product_name: product.name,
                product_type:product.type,
            });

            // If the product exists, update it; otherwise, create a new product
            if (existingProduct) {
                existingProduct.product_price = product.price;
                existingProduct.product_origin = product.origin;
                existingProduct.product_imgurl = product.imgURL;
                existingProduct.product_description = product.desc;
                existingProduct.product_type = product.type;

                // Save the updated product
                await existingProduct.save();
                return res.status(200).json("Product has been updated");
            } else {
                // Create a new product
                await R1.create({
                    userid: userInfo.id,
                    product_name: product.name,
                    product_price: product.price,
                    product_origin: product.origin,
                    product_imgurl: product.imgURL,
                    product_description: product.desc,
                    product_type: product.type
                });
                return res.status(200).json("Product has been added");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            return res.status(500).json("Internal Server Error");
        }
    });
}