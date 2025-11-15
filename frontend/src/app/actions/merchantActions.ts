"use server"
import { revalidatePath } from "next/cache";
import connectMongoDB from '../lib/mongoDB'
import Merchant from "../models/merchant";
import { getUrl } from "../utils/utils";
import { z } from 'zod'
const userSchema = z.object({
  name: z.string().trim().min(3, 'Business name must be at least 3 characters long'),
  email: z.email('Must be a valid email address'),
  password: z.string()
    .min(8, 'password must be at least 8 characters long')
    .max(20, 'password must be at most 20 characters long')
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*\W)[a-zA-Z\d\W]+$/,
      'password must include alphanumeric with special characters'),
  confirmPassword: z.string()
    .min(8, 'password must be at least 8 characters long')
    .max(20, 'password must be at most 20 characters long')
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*\W)[a-zA-Z\d\W]+$/,
      'password must include alphanumeric with special characters')

}).refine((data) => data.password === data.confirmPassword,
  {
    message: 'passwords do not match',
    path: ['confirmPassword']
  })

export type SignupErrors = {
  errors?: {
    name?: string[],
    email?: string[],
    password?: string[],
    confirmPassword?: string[],
  },
  success: boolean
}

export async function signupMerchant(data: SignupErrors, formData: FormData): Promise<SignupErrors> {
  const user = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };
  const result = userSchema.safeParse(user)
  if (result.success) {
    //signup ||  save to DB
    console.log('user : ',result.data);
    return {success: true}
  } else {
    console.log('result.error?.flatten().fieldErrors : ',result.error?.flatten().fieldErrors);
    return {success:false, errors: result.error?.flatten().fieldErrors}
    
  }
  // try {
  //   const db = await connectMongoDB();
  //   const newMerchantFromDB = await Merchant.create(merchant);
  //   revalidatePath("/merchant");
  //   if (newMerchantFromDB){
  //      console.log('A new merchant was saved successfully to DB ');
  //   } else {
  //     console.error('Failed to save the new merchant to DB');
  //   }
  // } catch (error) {
  //   console.error('Error creating merchant:', error);
  //   throw new Error('Failed to create merchant');
  // }
}

export const getMerchant = async (merchantId: String) => {
  const url = getUrl('merchant/getMerchant')

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ _id: merchantId })
  })
  const merchant = await res.json()

  return merchant
}