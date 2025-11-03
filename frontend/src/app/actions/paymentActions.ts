"use server"

import { redirect } from "next/navigation";

export async function handlePaymentAction(formData: FormData) {
    try {
        const amount = formData.get("amount") as string;
        const coin = formData.get("coin") as string;
        const network = formData.get("network") as string;

        if (!amount || !coin || !network) {
            throw new Error('Missing required payment details');
        }

        // Calculate fee
        const fee = await calculateFee(network);
        const totalAmount = Number(amount) + Number(fee);
    
        // Generate QR code
        const paymentQR = await generatePaymentQR({
            amount: totalAmount,
            coin,
            network
        });

        if (!paymentQR) {
            throw new Error('Failed to generate QR code');
        }

        const encodedQR = encodeURIComponent(paymentQR);

        //  confirmation page
        redirect(`/payment/confirm?qr=${encodedQR}`);

    } catch (error) {
        console.error('Payment action failed:', error);
        throw error; // Let Next.js error boundary handle it
    }
}

const calculateFee = async (network: string) => {
    "use server";
    //TODO - here we need to get network fees from the blockchain via 
    // the websocket to our API (watcher on chain)
    const baseFee = network === "ethereum" ? 0.002 : 0.0001; 
    const feeUsd = baseFee * 2500; // assuming 1 ETH = 2500 USD for example
    return Number(feeUsd.toFixed(2));
}

const generatePaymentQR = async (paymentDetails: { amount: number; coin: string; network: string }) => {
    //  TODO: send A request to API to generate QR code based on payment details
    // For now, return a placeholder string
    return "qr-code-data";
}
