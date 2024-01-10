import { PokeballIcon, PokeballOutlineIcon, ShinyIcon } from '@/lib/icons/gamegui'
import { PokedexSearchIndexItem } from '@/stores/dataset'
import { PokedexEntryState } from '@/stores/state/types'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import usePokedexSearchStore from '@/stores/usePokedexSearchStore'
import { motion } from 'framer-motion'
import { useState } from 'react'
import PokemonImg from '../PokemonImg'
import styles from './DexTrackerEntry.module.scss'

const swirlOutAnimation = {
  visible: { opacity: 1, scale: 1, rotate: 0 },
  hidden: { opacity: 0, scale: 0, rotate: 180, transition: { duration: 0.5 } },
}

const bounceAnimation = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  exit: { scale: 0.5, opacity: 0, transition: { duration: 0.3 } },
}

export function DexTrackerEntry({ dexId, data }: { dexId: string; data: PokedexSearchIndexItem }) {
  const searchFilters = usePokedexSearchStore((store) => store.filters)
  const updatePokemonEntry = useDexTrackerStore((store) => store.updateDexPokemon)
  const zeroPadDexNum = data.dexNum?.toString().padStart(4, '0')
  const [disappearMode, setDisappearMode] = useState<'caught' | undefined>()

  const pkmState: PokedexEntryState = {
    ...data.state,
    nid: data.nid,
  }

  const hasMotion = searchFilters?.hideCaught === true && disappearMode !== undefined
  const shouldTriggerMotion = searchFilters?.hideCaught === true

  if (pkmState.nid === undefined) {
    throw new Error(`Missing nid for ${data.id}`)
  }

  const toggleCaught = (prevState: PokedexEntryState) => {
    updatePokemonEntry(dexId, prevState.nid, {
      caught: !prevState.caught,
    })
  }

  const toggleShiny = (prevState: PokedexEntryState) => {
    updatePokemonEntry(dexId, prevState.nid, {
      shiny: !prevState.shiny,
    })
  }

  // const handleAnimationComplete = () => {
  //   // Update the other state here
  //   // setOtherState(true)
  // }

  const entryElement = (
    <>
      <div className={styles.entryInfo}>
        <div className={styles.entryHeader}>{`#${zeroPadDexNum ?? '--'}`}</div>
        <div className={styles.sprite}>
          <PokemonImg pokeNid={data.nid} shiny={pkmState.shiny || searchFilters?.shinyMode} />
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
            if (shouldTriggerMotion) {
              console.log('motion - setDisappearMode')
              setDisappearMode('caught')
              return
            }
            console.log('no--motion - toggleCaught')
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

  if (hasMotion) {
    return (
      <motion.div
        className={styles.entry}
        initial={bounceAnimation.initial}
        animate={bounceAnimation.animate}
        exit={bounceAnimation.exit}
        onAnimationStart={() => {
          console.log('onAnimationStart', disappearMode)
          if (disappearMode === 'caught') {
            setTimeout(
              () => {
                console.log('motion - toggleCaught')
                toggleCaught(pkmState)
              },
              100 + bounceAnimation.exit.transition.duration * 1000,
            )
          }
        }}
        // onAnimationEnd={() => {
        //   console.log('onAnimationEnd', disappearMode)
        // }}
      >
        {entryElement}
      </motion.div>
    )
  }

  return <div className={styles.entry}>{entryElement}</div>
}
