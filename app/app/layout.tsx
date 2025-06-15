'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { APIFetch } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const [user, setUser] = useState<{email: string, fullName: string} | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    console.log('fetching user')
    const res = await APIFetch('/whoami')
    const data = await res.json()
    if (res.ok) setUser(data)
    else router.replace('/login')
  }
  return user && (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar user={{
            email: user.email,
            name: user.fullName,
            avatar: ''
          }} />
          <SidebarInset>
            <div className="flex flex-1 flex-col">
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
