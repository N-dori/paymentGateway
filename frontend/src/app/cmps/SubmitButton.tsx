"use client"

import { useFormStatus } from "react-dom"

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: "0.75rem 1.5rem",
        background: pending ? "#cccccc" : "green",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: pending ? "not-allowed" : "pointer"
      }}
    >
      {pending ? "Processing..." : "Proceed to Payment"}
    </button>
  )
}