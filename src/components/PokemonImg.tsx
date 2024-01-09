import data from '@/data'
import { ComponentPropsWithoutRef } from 'react'

type GameImgProps = {
  pokeNid: string
  bordered?: boolean
  shiny?: boolean
} & ComponentPropsWithoutRef<'img'>

export default function PokemonImg({ pokeNid, bordered, shiny, ...props }: GameImgProps) {
  const artStyle = bordered ? 'home3d-icon-bordered' : 'home3d-icon'
  const shinyStyle = shiny ? 'shiny' : 'regular'
  const url = `${data.cdn_assets_url}/images/pokemon/${artStyle}/${shinyStyle}/${pokeNid}.png`
  return <img loading="lazy" src={url} width={64} height={64} {...props} alt={props.alt ?? `Pokemon: ${pokeNid}`} />
}
