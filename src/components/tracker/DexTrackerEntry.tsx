import { PokedexSearchableEntry } from '@/kernel/search'
import { FemaleIcon, MaleIcon, PokeballIcon, PokeballOutlineIcon, ShinyIcon } from '@/lib/icons/gamegui'
import { cn } from '@/lib/utils'
import { PokedexEntryState } from '@/stores/types/state'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import { ComponentPropsWithRef, forwardRef, useState } from 'react'
import PokemonImg from '../PokemonImg'
import styles from './DexTrackerEntry.module.scss'

type DexTrackerEntryProps = { index: number; total: number; fullDexId: string; data: PokedexSearchableEntry } & Omit<
  ComponentPropsWithRef<'div'>,
  'children'
>

function DexTrackerEntryNoRef({ index, total, fullDexId, data, ...props }: DexTrackerEntryProps) {
  const dexOptions = useDexTrackerStore((store) => store.options)
  const updatePokemonEntry = useDexTrackerStore((store) => store.updateDexPokemon)
  const zeroPadDexNum = data.num.toString().padStart(4, '0')
  const [animationClasses, setAnimationClasses] = useState<string[]>([])

  const pkmState: PokedexEntryState = {
    ...data.state,
    id: data.id,
  }

  const disappearsOnCatch = dexOptions?.hideCaught === true
  const animationClassesTimeouts = {
    disappear: 250,
  }

  if (pkmState.id === undefined) {
    throw new Error(`Missing pokemon ID (in the state) for ${data.id}`)
  }

  const toggleCaught = (prevState: PokedexEntryState) => {
    updatePokemonEntry(fullDexId, prevState.id, {
      caught: !prevState.caught,
    })
  }

  const toggleShiny = (prevState: PokedexEntryState) => {
    updatePokemonEntry(fullDexId, prevState.id, {
      shiny: !prevState.shiny,
    })
  }

  // const toggleMale = (prevState: PokedexEntryState) => {
  //   updatePokemonEntry(fullDexId, prevState.id, {
  //     male: !prevState.male,
  //   })
  // }

  // const toggleFemale = (prevState: PokedexEntryState) => {
  //   updatePokemonEntry(fullDexId, prevState.id, {
  //     female: !prevState.female,
  //   })
  // }

  const layoutShiftVisibleItems = 20
  const shouldLazyLoad = index >= layoutShiftVisibleItems && total > layoutShiftVisibleItems

  const isCompactMode = dexOptions?.compactMode === true
  const compactName = isCompactMode ? data.speciesName : data.name

  const isMaleForm = data.flags.hasGenderDifferences && !data.flags.isFemaleForm
  const isFemaleForm = data.flags.isFemaleForm

  const entryChildren = (
    <>
      <div className={cn(styles.entryInfo)} title={data.name}>
        <div className={styles.entryHeader}>{`#${zeroPadDexNum ?? '--'}`}</div>
        <div className={styles.sprite}>
          <PokemonImg
            loading={shouldLazyLoad ? 'lazy' : 'eager'}
            pkmId={data.id}
            shiny={dexOptions?.trackShinies && pkmState.shiny}
          />
          {isMaleForm && <MaleIcon className={cn(styles.genderIcon, styles.maleIcon)} />}
          {isFemaleForm && <FemaleIcon className={cn(styles.genderIcon, styles.femaleIcon)} />}
        </div>
      </div>
      <div className={styles.entryName}>{compactName}</div>
      <div className={styles.entryActions}>
        <div className={styles.entryActionsGroup}>
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
          {dexOptions?.trackShinies && (
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
          )}
        </div>
      </div>
    </>
  )

  return (
    <div
      className={cn(
        styles.entry,
        {
          [styles.compact]: dexOptions?.compactMode === true,
          [styles.caught]: pkmState.caught,
        },
        ...animationClasses,
      )}
      {...props}
    >
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
