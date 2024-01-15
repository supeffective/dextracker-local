import { routeFactory } from '@/kernel/routeFactory'
import { Gamepad2Icon } from '@/lib/icons/sections'
import { RouterLink } from '@/lib/router'
import { cn } from '@/lib/utils'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import { useState } from 'react'
import GameSelectField from '../GameSelectField'
import PokedexSelectField from '../PokedexSelectField'
import Btn from '../primitives/Btn'
import DrawerMenu, { DrawerMenuProps } from '../primitives/DrawerMenu'
import styles from './DexSwitchDrawer.module.scss'

export default function HomeDexSwitchDrawer({ className, children, ...props }: DrawerMenuProps) {
  const lastModTime = useDexTrackerStore((store) => store.lastModified)
  const [selectedGameId, setSelectedGameId] = useState<string | undefined>('sv-s')
  const [selectedDexId, setSelectedDexId] = useState<string | undefined>('paldea-blueberry')

  const showButton = selectedGameId && selectedDexId

  return (
    <DrawerMenu
      className={cn(styles.drawer, className)}
      placement="left"
      defaultOpen={!lastModTime}
      icon={<Gamepad2Icon />}
      buttonName="select-pokedex"
      buttonTitle="Select Pokédex"
      {...props}
    >
      {!selectedGameId && <div className={styles.groupTitle}>Select a Game</div>}
      {selectedGameId && <div className={styles.groupTitle}>Select a Pokédex</div>}
      <GameSelectField
        className={styles.selectField}
        label="Game: "
        name="game-select"
        nullable
        value={selectedGameId}
        onChange={(e) => {
          // navigate(routeFactory.pokedex(null, e.target.value))
          setSelectedGameId(e.target.value)
        }}
      />

      <PokedexSelectField
        className={styles.selectField}
        label="Dex: "
        name="dex-select"
        disabled={!selectedGameId}
        gameId={selectedGameId}
        value={selectedDexId}
        nullable
        onChange={(e) => {
          // navigate(routeFactory.pokedex(e.target.value, currentDexState.gameId))
          setSelectedDexId(e.target.value)
        }}
      />

      {children}
      {showButton && (
        <>
          <hr />
          <div className="text-center w-full">
            <Btn as={RouterLink} variant="yellow" to={routeFactory.pokedex(selectedDexId, selectedGameId)}>
              Go to Pokédex Tracker
            </Btn>
          </div>
        </>
      )}
    </DrawerMenu>
  )
}
