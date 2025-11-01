import { revalidatePath } from "next/cache";
import connectMongoDB from '../lib/mongoDB'
import Merchant from "../models/merchant";

export async function merchantSignup(formData: FormData) {
    "use server";
    const merchant = {
      businessName: formData.get("businessName"),
      email: formData.get("email"),
      publicAddress: formData.get("publicAddress"),
      stableCoins: formData.getAll("stableCoins"),
      networks: formData.getAll("networks"),
    };

    if (!merchant.businessName || !merchant.email || !merchant.publicAddress) {
      throw new Error("Missing required fields");
    }

    try {
      const db = await connectMongoDB();
      const newMerchantFromDB = await Merchant.create(merchant);
      revalidatePath("/merchant");
      if (newMerchantFromDB){
         console.log('A new merchant was saved successfully to DB ');
      } else {
        console.error('Failed to save the new merchant to DB');
      }
    } catch (error) {
      console.error('Error creating merchant:', error);
      throw new Error('Failed to create merchant');
    }
}