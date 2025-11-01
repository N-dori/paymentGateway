import { merchantSignup } from "../actions/merchantActions";

export default function MerchantSignup() {
  

  return (
    <div>
      <h1>Merchant Onboarding</h1>
      <p>
        Please fill in your business details. Your crypto address will be used
        for receiving payments.
      </p>

      <form action={merchantSignup}>
        <div>
          <label>Business Name:</label>
          <input type="text" name="businessName" required />
        </div>

        <div>
          <label>Contact Email:</label>
          <input type="email" name="email" required />
        </div>

        <div>
          <label>Public Crypto Address:</label>
          <input type="text" name="publicAddress" required />
        </div>

        <fieldset>
          <legend>Preferred stableCoins</legend>
          <p>Please choose the coins you’d like to be paid with:</p>
          <label>
            <input type="checkbox" name="stableCoins" value="USDT" /> USDT
          </label>
          <label>
            <input type="checkbox" name="stableCoins" value="USDC" /> USDC
          </label>
          <label>
            <input type="checkbox" name="stableCoins" value="DAI" /> DAI
          </label>
        </fieldset>

        <fieldset>
          <legend>Preferred networks</legend>
          <p>Please choose the blockchain preferred networks you’d like to operate on:</p>
          <label>
            <input type="checkbox" name="networks" value="ethereum" /> Ethereum
          </label>
          <label>
            <input type="checkbox" name="networks" value="tron" /> Tron (TRC-20)
          </label>
          <label>
            <input type="checkbox" name="networks" value="bsc" /> Binance Smart Chain (BEP-20)
          </label>
        </fieldset>

        <button type="submit">Register Merchant</button>
      </form>
    </div>
  );
}
