import { PokeballIcon, PokeballOutlineIcon, ShinyIcon } from '@/lib/icons/gamegui'
import { cn } from '@/lib/utils'
import { PokedexSearchableEntry } from '@/stores/search'
import { PokedexEntryState } from '@/stores/types/state'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import usePokedexSearchStore from '@/stores/usePokedexSearchStore'
import { ComponentPropsWithRef, forwardRef, useState } from 'react'
import PokemonImg from '../PokemonImg'
import styles from './DexTrackerEntry.module.scss'

type DexTrackerEntryProps = { index: number; total: number; dexId: string; data: PokedexSearchableEntry } & Omit<
  ComponentPropsWithRef<'div'>,
  'children'
>

function DexTrackerEntryNoRef({ index, total, dexId, data, ...props }: DexTrackerEntryProps) {
  const searchFilters = usePokedexSearchStore((store) => store.filters)
  const updatePokemonEntry = useDexTrackerStore((store) => store.updateDexPokemon)
  const zeroPadDexNum = data.num.toString().padStart(4, '0')
  const [animationClasses, setAnimationClasses] = useState<string[]>([])

  const pkmState: PokedexEntryState = {
    ...data.state,
    id: data.id,
  }

  const disappearsOnCatch = searchFilters?.hideCaught === true
  const animationClassesTimeouts: Record<string, number> = {
    disappear: 500,
    bounce: 1000,
  }

  if (pkmState.id === undefined) {
    throw new Error(`Missing pokemon ID (in the state) for ${data.id}`)
  }

  const toggleCaught = (prevState: PokedexEntryState) => {
    updatePokemonEntry(dexId, prevState.id, {
      caught: !prevState.caught,
    })
  }

  const toggleShiny = (prevState: PokedexEntryState) => {
    updatePokemonEntry(dexId, prevState.id, {
      shiny: !prevState.shiny,
    })
  }

  const layoutShiftVisibleItems = 20
  const shouldLazyLoad = index >= layoutShiftVisibleItems && total > layoutShiftVisibleItems

  const entryChildren = (
    <>
      <div className={styles.entryInfo}>
        <div className={styles.entryHeader}>{`#${zeroPadDexNum ?? '--'}`}</div>
        <div className={styles.sprite}>
          <PokemonImg
            loading={shouldLazyLoad ? 'lazy' : 'eager'}
            pkmId={data.id}
            shiny={pkmState.shiny || searchFilters?.shinyMode}
          />
        </div>
      </div>
      <div className={styles.entryName}>{data.name ?? `"${data.id}"`}</div>
      <div className={styles.entryActions}>
        <button
          tabIndex={0}
          title="Registered"
          type="button"
          className={styles.ballButton}
          onClick={() => {
            if (disappearsOnCatch) {
              setAnimationClasses([styles.animJumpyWalk])
              setTimeout(() => {
                toggleCaught(pkmState)
              }, animationClassesTimeouts.disappear)
              return
            }
            toggleCaught(pkmState)
          }}
          data-active={pkmState.caught ?? 0}
        >
          {pkmState.caught && <PokeballIcon />}
          {!pkmState.caught && <PokeballOutlineIcon />}
        </button>
        <button
          tabIndex={0}
          title="Shiny registered"
          type="button"
          className={styles.shinyButton}
          onClick={() => toggleShiny(pkmState)}
          data-active={pkmState.shiny ?? 0}
        >
          <ShinyIcon />
        </button>
        {/* 
        // TODO: add support when we have our custom data source
        <button tabIndex={0} type="button" data-active={pkmState.genders.includes('m')}>
                <MaleIcon className={styles.small} />
              </button>
              <button tabIndex={0} type="button" data-active={pkmState.genders.includes('f')}>
                <FemaleIcon className={styles.small} />
              </button> */}
      </div>
    </>
  )

  return (
    <div className={cn(styles.entry, ...animationClasses)} {...props}>
      {entryChildren}
    </div>
  )
}

const DexTrackerEntry = forwardRef<HTMLDivElement, DexTrackerEntryProps>((props, ref) => {
  return (
    <div className={cn(styles.entryWrapper)} ref={ref}>
      <DexTrackerEntryNoRef {...props} />
    </div>
  )
})

export default DexTrackerEntry
