'use client'
import { SignupForm } from "@/components/signup-form"
import { APIFetch } from "@/lib/utils"
import { FormEvent } from "react"

export default function Page() {
  const signupSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const res = await APIFetch('/signup', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    console.log(data)
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm submit={signupSubmit} />
      </div>
    </div>
  )
}
