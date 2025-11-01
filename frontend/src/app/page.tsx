import Link from "next/link";

export default async function Home() {

  return (
    <main className="home-page-container flex-col full" >
        <section className="welcome-conteiner flex-col flex-ac">
            <h1 className="welcome-txt tac"> Crypto Payment Gateway Demo  </h1>
            <p>Our payment gateway enables small businesses to accept stablecoin payments securely and instantly on the blockchain.</p>
            <p> Customers can view the total cost—including gas fees and shipping—and pay through a 15-minute QR code, with real-time notifications sent to both merchant and buyer once the transaction is confirmed.
                After confirmation, merchants can immediately handle packaging, taxes, while avoiding high traditional payment fees.</p>
            <Link href={'/merchant'} className="signup-to-class-btn" >Merchant signup flow </Link>
            <Link href={'/payment'} className="signup-to-class-btn" >Buyer payment flow </Link>
        </section>
    </main>
  );
}
