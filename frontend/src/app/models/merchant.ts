import mongoose, { Schema } from "mongoose";

const merchantSceama = new Schema ({
    businessName : {
        type: String,
        required:[true , " please write your business name"]
    } ,
    email :  {
        type: String,
        required:[true , " please provide valid email"],
        unique:true,
    }  ,
    publicAddress: { 
         type: String,
         required: true
    },
    stableCoins: [{
         type: String, required: true 
    }],
    networks: [{
         type: String, required: true
    }],
},
{
    timestamps:true
})

const Merchant = mongoose.models.merchant || mongoose.model('merchant', merchantSceama) 

export default Merchant