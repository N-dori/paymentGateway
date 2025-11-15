"use client"

import { useFormStatus } from "react-dom"
type SubmissionBtnProps = {
    txt: string
    txtWhenPending: string
}
export const  SubmitButton = ({txt,txtWhenPending}:SubmissionBtnProps) => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: "0.75rem 1.5rem",
        background: pending ? "#cccccc" : "#4c63af",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: pending ? "not-allowed" : "pointer"
      }}
    >
      {pending ? txtWhenPending : txt}
    </button>
  )
}