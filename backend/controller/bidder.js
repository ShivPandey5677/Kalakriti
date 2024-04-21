import R1 from "../models/bidder.js"
import jwt from "jsonwebtoken"
export async function placeBid(req,res){
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In");
    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid");

        const bidder = req.body;
        console.log(bidder);

        try {
            // Find the product in the database based on user ID and product name
            const existingProduct = await R1.findOne({
                userid: userInfo.id,
                product_id: bidder.productId,
            });

            // If the product exists, update it; otherwise, create a new product
            if (existingProduct) {
                existingProduct.bidder_price = bidder.bidPrice;

                // Save the updated product
                await existingProduct.save();
                return res.status(200).json("Product has been updated");
            } else {
                // Create a new product
                await R1.create({
                    userid: userInfo.id,
                    product_id: bidder.productId,
                    product_name:bidder.productName,
                    product_img:bidder.productImg,
                    bidder_price:bidder.bidPrice,
                    bidder_name:bidder.name
                });
                return res.status(200).json("Bidder has been added");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            return res.status(500).json("Internal Server Error");
        }
    });
}
 // Import your mongoose model
export async function getBidders(req, res) {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In");

    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid");

        try {
            // Retrieve all data from the R1 model
            const bidders = await R1.find({});
            return res.status(200).json(bidders);
        } catch (error) {
            console.error("Error retrieving bidders:", error);
            return res.status(500).json("Internal Server Error");
        }
    });
}
