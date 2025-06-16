'use client'
import { Button } from "@/components/ui/button";
import { APIFetch } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Post = {
  id: string,
  title: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  likes: string,
  user?: {
    fullName: string
    id: number
  }
}

const controller = new AbortController()
const signal = controller.signal

export default function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchData(page)
  }, [page])

  const fetchData = async (page: number) => {
      setLoading(true)
      const res = await APIFetch(`/posts?page=${page}`, { signal })
      setLoading(false)
      const data = await res.json()
      if (page === 1) setPosts(data.data)
      else setPosts((prev) => [...prev, ...data.data])
      setPage(data.meta.currentPage)
      setLastPage(data.meta.lastPage)
      return data
  }


  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-8 py-4 px-12">
      {posts.map((p) => {
        const date = new Date(p.createdAt)
        return (
          <Card key={p.id} className="w-full min-h-96">
            <CardHeader>
              <CardTitle>{p.id} | {p.title}</CardTitle>
              <CardDescription>{p.user?.fullName ?? `Anonymous-${p.user?.id}`}</CardDescription>
              <CardAction>
                {date.getHours().toString().padStart(2, '0')}:{date.getMinutes()}, {date.toDateString()}
              </CardAction>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{p.description}</p>
            </CardContent>
            <CardFooter>
              {p.likes} likes
            </CardFooter>
          </Card>
        )
      })}
      <div className="flex flex-col gap-3 items-center w-full">
          <Button className="w-full h-16 disabled:text-gray-400" variant="ghost" disabled={!Boolean(lastPage && page < lastPage) || loading} onClick={() => {
            if (lastPage && page < lastPage) setPage((prev) => prev + 1)
          }}>
            Load more
          </Button>
        </div>
    </div>
  );
}