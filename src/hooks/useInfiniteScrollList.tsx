import { useEffect, useRef, useState } from 'react'

interface UseLazyLoadListOptions {
  chunkSize: number
  lastElementRef: React.MutableRefObject<HTMLElement | null>
}

function useInfiniteScrollList<T>(items: T[], { chunkSize, lastElementRef }: UseLazyLoadListOptions): T[] {
  const [visibleCount, setVisibleCount] = useState(chunkSize)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (items.length <= visibleCount) {
      return
    }

    function stopObserving() {
      if (observerRef.current && lastElementRef.current) {
        observerRef.current.unobserve(lastElementRef.current)
      }
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((v) => v + chunkSize)
          setTimeout(() => {
            // stopObserving()
          }, 50) // necessary?
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.01,
      },
    )

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current)
    }

    return () => {
      stopObserving()
    }
  }, [items, chunkSize, visibleCount, lastElementRef])

  const visibleItems = items.slice(0, visibleCount)

  return [...visibleItems]
}

export default useInfiniteScrollList
