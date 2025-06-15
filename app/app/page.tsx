'use client'
import { APIFetch } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState<{email: string} | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
      const res = await APIFetch('/whoami')
      const data = await res.json()
      setUser(data)
  }


  return (
    <div className="flex w-full h-full justify-center items-center">
      <p>
        {user?.email ?? 'No user'}
      </p>
    </div>
  );
}