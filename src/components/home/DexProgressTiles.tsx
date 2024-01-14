import { routeFactory } from '@/kernel/routeFactory'
import { gamesDatasetMap } from '@/lib/dataset/games'
import { pokedexBasicInfoMap } from '@/lib/dataset/pokedexes'
import { pokemonDatasetMap } from '@/lib/dataset/pokemon'
import { RouterLink } from '@/lib/router'
import { cn } from '@/lib/utils'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import { ComponentPropsWithoutRef } from 'react'
import GameImg from '../GameImg'
import ProgressBar from '../primitives/ProgressBar'
import TitledSection from '../primitives/TitledSection'
import styles from './DexProgressTiles.module.scss'

type DexProgressTilesProps = {} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>

export default function DexProgressTiles({ className, ...props }: DexProgressTilesProps) {
  const [dexesStateMap, dexFilters] = useDexTrackerStore((store) => [store.dexes, store.filters])
  const dexes = Object.values(dexesStateMap)
  const dexesData = dexes
    .map((dexState) => {
      const dex = pokedexBasicInfoMap.get(dexState.dexId)
      if (!dex) {
        throw new Error(`Dex ${dexState.dexId} not found`)
      }

      const game = gamesDatasetMap.get(dexState.gameId)
      if (!game) {
        console.error(`GameId not found for dex GID: ${dexState.id}; GameId: ${dexState.gameId}`)
        return
      }

      const pokemon = Object.values(dexState.pokemon)
        .map((pokemonState) => {
          const pokemon = pokemonDatasetMap.get(pokemonState.id)
          if (!pokemon) {
            console.error(`PokemonId not found for dex GID: ${dexState.id}; PokemonId: ${pokemonState.id}`)
            return
          }
          return {
            ...pokemon,
            ...pokemonState,
          }
        })
        .filter((pokemon): pokemon is NonNullable<typeof pokemon> => Boolean(pokemon))

      const dexTotal = dexFilters?.hideForms ? dex.speciesCount : dex.speciesCount + dex.formsCount
      const caught = pokemon.filter((pokemon) => {
        if (dexFilters?.hideForms && pokemon.flags.isForm) {
          return false
        }
        return pokemon
      }).length

      return {
        dex: dex,
        game: game,
        createdAt: dexState.createdAt,
        modifiedAt: dexState.lastModified,
        progress: [caught, dexTotal],
      }
    })
    .filter((data): data is NonNullable<typeof data> => Boolean(data))
    .sort((a, b) => {
      if (a.modifiedAt > b.modifiedAt) {
        return -1
      }
      if (a.modifiedAt < b.modifiedAt) {
        return 1
      }
      return 0
    })

  if (dexesData.length < 2) {
    return null
  }

  return (
    <TitledSection title={'Dex Progress'} className={cn(styles.panel, className)} {...props}>
      <div className={styles.tiles}>
        {dexesData.map(({ dex, game, modifiedAt, progress }) => {
          const isCompleted = progress[0] === progress[1]
          return (
            <RouterLink to={routeFactory.pokedex(dex.id, game.id)} key={dex.id} className={styles.tile}>
              <div className={styles.header}>
                <GameImg width={120} height={120} gameId={game.id} />
                <ProgressBar
                  className={styles.progress}
                  value={progress[0]}
                  max={progress[1]}
                  label={
                    <span className={styles.progressText}>
                      {isCompleted && 'COMPLETED'}
                      {!isCompleted && (
                        <>
                          {progress[0]}/{progress[1]}
                        </>
                      )}
                    </span>
                  }
                />
              </div>
              <div className={styles.text}>
                <div className={styles.gameName}>Pokémon {game.name}</div>
                <div className={styles.dexName}>{dex.name.replace(/Pok[é]dex/gi, '').trim()} Pokédex</div>
                <div className={styles.dateModified}>{new Date(modifiedAt).toLocaleString()}</div>
              </div>
            </RouterLink>
          )
        })}
      </div>
    </TitledSection>
  )
}
