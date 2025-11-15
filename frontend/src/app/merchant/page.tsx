"use client"
import { signupMerchant } from "../actions/merchantActions";
import { FormError } from "../cmps/FormError";
import Logo from "../cmps/Logo";
import React from "react";
import { SubmitButton } from "../cmps/SubmitButton";


export default function MerchantSignup() {
  const [state, fromAction] = React.useActionState(signupMerchant, { success: false })

  return (
    <section className="sign-up-container gc2 flex-col flex-ac">

      <section className="sign-up-wrapper">

        <header className="sign-up-header mb-1"><Logo /> </header>
        <h2 className="mb-1">Create an Account</h2>
        <p className="mb-1">
          Please fill in your email, and create a password to get started
        </p>

        <form action={fromAction}>
          <div className="flex-col gap1">
            <label><span>*</span>Business Name:</label>
            <input className="h-2" type="text" name="name" required />
            <FormError errors={state.errors?.name} />
          </div>

          <div className="flex-col gap1">
            <label><span>*</span>Email:</label>
            <input className="h-2" type="text" name="email" />
            <FormError errors={state.errors?.email} />
          </div>

          <div className="flex-col gap1">
            <label><span>*</span>Password</label>
            <input className="h-2" type="password" name="password" required />
            <FormError errors={state.errors?.password} />
          </div>
          <div className="flex-col gap1">
            <label><span>*</span>Confirm Password</label>
            <input className="h-2" type="password" name="confirmPassword" required />
            <FormError errors={state.errors?.confirmPassword} />
          </div>



          {/* <fieldset>
         <span>*</span> <legend>Preferred networks</legend>
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
          </fieldset> */}

          <SubmitButton txt={'Register Merchant'} txtWhenPending={'Registering...'} />
          {state.success && (
            <div style={{ color: 'green', marginTop: '1rem' }}>
              Merchant registered successfully!
            </div>
          )}
        </form>
      </section>
      <div className="backdrop"></div>
    </section>
  );
}
