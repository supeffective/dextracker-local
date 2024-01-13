import { getGameCoverImageUrls } from '@/kernel/urls'
import { ComponentPropsWithoutRef } from 'react'
import ImageSet from './primitives/ImageSet'

type GameImgProps = {
  gameId: string
} & ComponentPropsWithoutRef<'img'>

export default function GameImg({ gameId, ...props }: GameImgProps) {
  const urls = getGameCoverImageUrls(gameId)
  return (
    <ImageSet
      sources={urls}
      width={48}
      height={48}
      alt={props.alt ?? `Game: ${gameId}`}
      data-noninteractive
      {...props}
    />
  )
}
