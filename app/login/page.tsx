'use client'
import { LoginForm } from "@/components/login-form"
import { APIFetch } from "@/lib/utils";
import { useRouter } from "next/navigation"
import { FormEvent } from "react"

export default function Page() {
  const router = useRouter();
  const loginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const res = await APIFetch('/login', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (data.success) {
      router.replace('/app')
    }
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm submit={loginSubmit} />
      </div>
    </div>
  )
}
