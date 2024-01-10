import data from '@/data'
import { FileDownloadIcon, SettingsIcon, UploadIcon } from '@/lib/icons/actions'
import { GithubIcon } from '@/lib/icons/brands'
import { PokeballIcon, ShinyIcon } from '@/lib/icons/gamegui'
import { ForkIcon } from '@/lib/icons/sections'
import { cn } from '@/lib/utils'
import { getDexSourceCodeUrl } from '@/stores/cdn'
import { PokedexSearchStateFilter } from '@/stores/state/types'
import useDexTrackerStore, { useCurrentGameAndDex } from '@/stores/useDexTrackerStore'
import usePokedexSearchStore from '@/stores/usePokedexSearchStore'
import { ComponentPropsWithoutRef } from 'react'
import GameIndicator from './GameIndicator'
import GameSelectField from './GameSelectField'
import PokedexSelectField from './PokedexSelectField'
import styles from './StickyToolbar.module.scss'
import DrawerMenu from './primitives/DrawerMenu'
import FileUploadBtn from './primitives/FileUploadBtn'
import ToggleBtn from './primitives/ToggleBtn'
import { DownloadTextButton } from './primitives/text-download'

type StickyToolbarProps = {} & ComponentPropsWithoutRef<'div'>

export default function StickyToolbar({ className, ...props }: StickyToolbarProps) {
  const { currentGame, currentDex } = useCurrentGameAndDex()
  const state = useDexTrackerStore((store) => store)
  const searchState = usePokedexSearchStore((store) => store)
  const filters: PokedexSearchStateFilter = searchState.filters ?? {}

  let debounceSearchTimeout: NodeJS.Timeout | null = null
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceSearchTimeout) {
      clearTimeout(debounceSearchTimeout)
    }
    debounceSearchTimeout = setTimeout(() => {
      searchState.setSearchQuery(e.target.value)
    }, 300)
  }

  const gameIcon = <GameIndicator className={cn('avatar-raised')} gameId={currentGame.id} />
  const settingsIcon = <SettingsIcon />

  const jsonState = JSON.stringify(state, null, 2)

  const handleJsonUpload = (data: string) => {
    try {
      state.loadFromJSON(data)
    } catch (error) {
      alert(`${error}`)
    }
    alert('Data imported successfully.')
    window.location.reload()
  }

  return (
    <div className={cn(styles.toolbar, className)} {...props}>
      <DrawerMenu placement="left" icon={gameIcon}>
        <GameSelectField
          className={styles.labelledSelect}
          label="Game: "
          value={state.currentGameId}
          onChange={(e) => {
            state.setCurrentGame(e.target.value)
          }}
        />
        <PokedexSelectField
          className={styles.labelledSelect}
          label="Dex: "
          gameId={state.currentGameId}
          value={state.currentDexId}
          onChange={(e) => {
            state.setCurrentDex(e.target.value)
          }}
        />
        <hr />
        <div className={styles.flexLinks}>
          <a href={getDexSourceCodeUrl(currentDex.region, currentDex.id)} target="_blank" rel="noreferrer">
            <GithubIcon />
            <span>Edit source code</span>
          </a>
        </div>
      </DrawerMenu>
      <div className={styles.searchBoxWrapper}>
        <div className={styles.searchBox}>
          <input
            // biome-ignore lint/a11y/noAutofocus: <explanation>
            autoFocus
            type="search"
            placeholder="Search Pokémon..."
            defaultValue={filters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <DrawerMenu placement="right" icon={settingsIcon}>
        <label className={styles.flexLabel}>
          <span>Toggle Caught</span>
          <ToggleBtn
            name="toggle-caught"
            className={cn(styles.toggle)}
            value={filters.hideCaught}
            inverted
            onToggle={(active) => {
              searchState.setHideCaught(active)
            }}
          >
            {[<PokeballIcon key="ball1" className={cn(styles.disabledBall)} />, <PokeballIcon key="ball2" />]}
          </ToggleBtn>
        </label>
        <label className={styles.flexLabel}>
          <span>Shiny sprites</span>
          <ToggleBtn
            name="toggle-shiny"
            className={cn(styles.toggle)}
            value={filters.shinyMode}
            onToggle={(active) => {
              searchState.setShinyMode(active)
            }}
          >
            <ShinyIcon />
          </ToggleBtn>
        </label>
        <label className={styles.flexLabel}>
          <span>Toggle forms</span>
          <ToggleBtn
            name="toggle-forms"
            className={cn(styles.toggle)}
            value={filters.hideForms}
            inverted
            onToggle={(active) => {
              searchState.setHideForms(active)
            }}
          >
            <ForkIcon data-nofill style={{ transform: 'rotate(-180deg)' }} />
          </ToggleBtn>
        </label>
        <hr />
        <label className={styles.flexLabel}>
          <span>Download data</span>
          <DownloadTextButton
            filename="super-pokedex-tracker-data.json"
            content={jsonState}
            contentType="application/json"
            variant="yellow"
          >
            <FileDownloadIcon data-nofill />
          </DownloadTextButton>
        </label>
        <FileUploadBtn
          title="Upload data"
          className={styles.flexLabel}
          variant="yellow"
          label={<span>Upload data</span>}
          accepts=".json"
          onUpload={handleJsonUpload}
        >
          <UploadIcon data-nofill />
        </FileUploadBtn>
        <hr />
        <div className={styles.appVersion}>
          <b>Super Pokédex Tracker </b>
          <span>v{data.version}</span>
        </div>
      </DrawerMenu>
    </div>
  )
}
