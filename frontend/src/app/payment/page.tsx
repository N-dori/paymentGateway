import { handlePaymentAction } from "../actions/paymentActions";
import { Merchant } from "@/types/Merchant";
import { getMerchant } from "../actions/merchantActions";
import { SubmitButton } from "../cmps/SubmitButton";

export default async function PayerForm() {
    const merchantId = "69064844e97857b80838bfb6";
    const merchant: Merchant = await getMerchant(merchantId);
if(!merchant){
    return <div>not found</div>
}
    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Pay with Crypto</h1>
            <p>Select your preferred stablecoin and network to complete your payment.</p>

            <form action={handlePaymentAction}>
                <div>
                    <div>
                        <label>Item Price:</label>
                        <input type="number" name="amount" required />
                    </div>

                    <fieldset>
                        <legend>Select Coin</legend>
                        {merchant?.stableCoins.map((coin: string) => (
                            <label key={coin} style={{ marginRight: "1rem" }}>
                                <input
                                    type="radio"
                                    name="coin"
                                    value={coin}
                                    required
                                />
                                {coin}
                            </label>
                        ))}
                    </fieldset>

                    <fieldset>
                        <legend>Select Network</legend>
                        {merchant?.networks.map((network: string) => (
                            <label key={network} style={{ marginRight: "1rem" }}>
                                <input
                                    type="radio"
                                    name="network"
                                    value={network}
                                    required
                                />
                                {network}
                            </label>
                        ))}
                    </fieldset>
                </div>

                <SubmitButton />
            </form>
        </div>
    );
}