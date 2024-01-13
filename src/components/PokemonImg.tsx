import { getPokemonImageUrls } from '@/kernel/urls'
import { ComponentPropsWithoutRef } from 'react'
import ImageSet from './primitives/ImageSet'

type GameImgProps = {
  pkmId: string
  shiny?: boolean
} & ComponentPropsWithoutRef<'img'>

export default function PokemonImg({ pkmId, shiny, alt, ...props }: GameImgProps) {
  const urls = getPokemonImageUrls(pkmId, shiny ?? false)
  return (
    <ImageSet
      loading="lazy"
      sources={urls}
      width={128}
      height={128}
      alt={alt ?? `Pokemon: ${pkmId}`}
      data-noninteractive
      {...props}
    />
  )
}
