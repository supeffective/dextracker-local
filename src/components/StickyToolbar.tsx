import data from '@/data'
import { ShinyIcon } from '@/lib/icons'
import { FileDownloadIcon, SettingsIcon, UploadIcon } from '@/lib/icons/actions'
import { GithubIcon } from '@/lib/icons/brands'
import { cn } from '@/lib/utils'
import { getDexSourceCodeUrl } from '@/stores/cdn'
import useDexTrackerStore, { useCurrentGameAndDex } from '@/stores/useDexTrackerStore'
import { ComponentPropsWithoutRef } from 'react'
import DrawerMenu from './DrawerMenu'
import GameIndicator from './GameIndicator'
import GameSelectField from './GameSelectField'
import PokedexSelectField from './PokedexSelectField'
import styles from './StickyToolbar.module.scss'
import FileUploadBtn from './primitives/FileUploadBtn'
import ToggleBtn from './primitives/ToggleBtn'
import { DownloadTextButton } from './text-download'

type StickyToolbarProps = {} & ComponentPropsWithoutRef<'div'>

export default function StickyToolbar({ className, ...props }: StickyToolbarProps) {
  const { currentGame, currentDex } = useCurrentGameAndDex()
  const state = useDexTrackerStore((state) => state)

  let debounceSearchTimeout: NodeJS.Timeout | null = null
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceSearchTimeout) {
      clearTimeout(debounceSearchTimeout)
    }
    debounceSearchTimeout = setTimeout(() => {
      state.setSearchQuery(e.target.value)
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
            defaultValue={state.filter?.searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <DrawerMenu placement="right" icon={settingsIcon}>
        <label className={styles.flexLabel}>
          <span>Shiny sprites</span>
          <ToggleBtn
            className={cn(styles.toggle, { [styles.toggleActive]: state.filter?.shinyMode })}
            value={state.filter?.shinyMode}
            onToggle={(active) => {
              state.setShinyMode(active)
            }}
          >
            <ShinyIcon />
          </ToggleBtn>
        </label>
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
        <div className={styles.appVersion}>
          <b>Super Pokédex Tracker </b>
          <span>v{data.version}</span>
        </div>
      </DrawerMenu>
    </div>
  )
}
