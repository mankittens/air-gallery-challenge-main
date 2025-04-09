"use client"

import { Board, fetchBoards } from "@/api/boards";
import { ClipsListResponse, fetchAssets } from "@/api/clips";
import { BoardView } from "@/components/BoardView";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [boards, setBoards] = useState<Board[]>([])

  const [isLoadingClips, setIsLoadingClips] = useState(true)
  const [clipsResponse, setClipsResponse] = useState<ClipsListResponse['data'] & {pagination: Pick<ClipsListResponse['pagination'], 'cursor' | 'hasMore'>}>({
    total: 0,
    clips: [],
    pagination: {
      cursor: null,
      hasMore: true,
    },
  })

  // initial load
  useEffect(() => {
    fetchBoards().then((boards) => setBoards(boards.data))
    fetchAssets({cursor: null}).then((assets) => {
      setClipsResponse({...assets.data, pagination: assets.pagination})
      setIsLoadingClips(false)
    })
  }, [])

  // load more clips...
  const loadMore = useCallback(async () => {
    if (isLoadingClips || !clipsResponse.pagination.hasMore) return
    
    setIsLoadingClips(true)

    try {
      const response = await fetchAssets({ cursor: clipsResponse.pagination.cursor })

      setClipsResponse(prev => ({
        total: response.data.total,
        clips: [...prev.clips, ...response.data.clips],
        pagination: response.pagination,
      }))
    } catch (error) {
      console.error('Error loading more clips:', error)
    } finally {
      setIsLoadingClips(false)
    }
  }, [isLoadingClips, clipsResponse.pagination.cursor, clipsResponse.pagination.hasMore])

  // ...when scrolling to the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMore])

  return <main><BoardView boards={boards} clipsResponse={clipsResponse} /></main>;
}
