import connectMongoDB from '../../../lib/mongoDB'
import { NextRequest, NextResponse } from 'next/server'
import Merchant from '../../../models/merchant';

export async function POST(request: NextRequest) {

    try {
     const { _id } = await request.json();
        console.log({_id});
        
        if (!_id) {
            return NextResponse.json(
                { message: "Merchant ID is required" }, 
                { status: 400 }
            );
        }
        await connectMongoDB()
        const merchant = await Merchant.findOne( {_id} )
        if ( !merchant) return NextResponse.json({message: "merchant not found ", status: 404})
        
        return NextResponse.json(merchant, { status: 201 })

    } catch (err) {
        console.log('had a problem finding merchant', err);
        return NextResponse.json({ message: "had a problem getting merchant" }, { status: 500 })
    }
}