import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Fetch = (URL: string, init?: RequestInit) => Promise<Response>

export const APIFetch: Fetch = async (input, init = {}) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${input}`, {
    ...init,
    credentials: 'include',
    headers: {
      ...init.headers,
    }
  })
}
