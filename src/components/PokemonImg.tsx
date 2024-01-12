import config from '@/config'
import { ComponentPropsWithoutRef } from 'react'

type GameImgProps = {
  pkmId: string
  bordered?: boolean
  shiny?: boolean
} & ComponentPropsWithoutRef<'img'>

export default function PokemonImg({ pkmId, bordered, shiny, alt, ...props }: GameImgProps) {
  const artStyle = bordered ? 'home3d-icon-bordered' : 'home3d-icon'
  const shinyStyle = shiny ? 'shiny' : 'regular'
  const url = `${config.cdn_assets_url}/images/pokemon/${artStyle}/${shinyStyle}/${pkmId}.png`
  // biome-ignore lint/a11y/useAltText: its done
  return <img loading="lazy" src={url} width={128} height={128} alt={alt ?? `Pokemon: ${pkmId}`} {...props} />
}
