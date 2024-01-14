import config from '@/config'
import { routeFactory } from '@/kernel/routes'
import { getDexSourceCodeUrl } from '@/kernel/urls'
import { FileDownloadIcon, SettingsIcon, UploadIcon } from '@/lib/icons/actions'
import { GithubIcon } from '@/lib/icons/brands'
import { PokeballIcon, ShinyIcon } from '@/lib/icons/gamegui'
import { PawPrintIcon } from '@/lib/icons/sections'
import { cn } from '@/lib/utils'
import { DexTrackerFilterState } from '@/stores/types/state'
import { useCurrentDexData } from '@/stores/useCurrentDexData'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import { useRouteNavigator } from '@/stores/useRouterStore'
import { ComponentPropsWithoutRef } from 'react'
import GameIndicator from './GameIndicator'
import GameSelectField from './GameSelectField'
import PokedexSelectField from './PokedexSelectField'
import styles from './StickyToolbar.module.scss'
import DrawerMenu from './primitives/DrawerMenu'
import FileUploadBtn from './primitives/FileUploadBtn'
import ToggleBtn from './primitives/ToggleBtn'
import { DownloadTextButton } from './primitives/text-download'

type StickyToolbarProps = {
  leftContent?: React.ReactNode
  noSearch?: boolean
} & ComponentPropsWithoutRef<'div'>

export default function StickyToolbar({ className, noSearch, leftContent, ...props }: StickyToolbarProps) {
  const { info: currentDex, state: currentDexState } = useCurrentDexData()
  const navigate = useRouteNavigator()
  const store = useDexTrackerStore((store) => store)
  const filters: DexTrackerFilterState = store.filters ?? {}

  let debounceSearchTimeout: NodeJS.Timeout | null = null
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceSearchTimeout) {
      clearTimeout(debounceSearchTimeout)
    }
    debounceSearchTimeout = setTimeout(() => {
      store.setSearchQuery(e.target.value)
    }, 300)
  }

  const gameIcon = <GameIndicator className={cn('avatar-raised')} gameId={currentDexState?.gameId ?? 'home'} />
  const settingsIcon = <SettingsIcon />

  const jsonState = JSON.stringify(store, null, 2)

  const handleJsonUpload = (data: string) => {
    try {
      store.loadFromJSON(data)
    } catch (error) {
      alert(`${error}`)
    }
    alert('Data imported successfully.')
    window.location.reload()
  }

  const emptyDiv = <div>&nbsp;</div>

  return (
    <div className={cn(styles.toolbar, className)} {...props}>
      {currentDexState && (
        <DrawerMenu
          className={cn(styles.drawer)}
          placement="left"
          icon={gameIcon}
          buttonName="switch-pokedex"
          buttonTitle="Switch Pokédex"
        >
          <GameSelectField
            className={styles.labelledSelect}
            label="Game: "
            name="game-select"
            value={currentDexState.gameId}
            onChange={(e) => {
              // state.setCurrentGame(e.target.value)
              navigate(routeFactory.pokedex(null, e.target.value))
            }}
          />
          <PokedexSelectField
            className={styles.labelledSelect}
            label="Dex: "
            name="dex-select"
            gameId={currentDexState.gameId}
            value={currentDexState.dexId}
            onChange={(e) => {
              // state.setCurrentDex(e.target.value)
              navigate(routeFactory.pokedex(e.target.value, currentDexState.gameId))
            }}
          />
          {currentDex && (
            <>
              <hr />
              <div className={styles.flexLinks}>
                <a href={getDexSourceCodeUrl(currentDex.region, currentDex.id)} target="_blank" rel="noreferrer">
                  <GithubIcon />
                  <span>Edit source code</span>
                </a>
              </div>
            </>
          )}
        </DrawerMenu>
      )}
      {!currentDexState && !leftContent && emptyDiv}
      {leftContent}
      <div className={styles.searchBoxWrapper}>
        {!noSearch && (
          <div className={styles.searchBox}>
            <input
              type="search"
              name="pokemon-search"
              placeholder="Search Pokémon..."
              defaultValue={filters.searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        )}
        {noSearch && emptyDiv}
      </div>
      <DrawerMenu
        className={cn(styles.drawer)}
        placement="right"
        icon={settingsIcon}
        buttonName="settings"
        buttonTitle="Settings"
      >
        {currentDexState && (
          <label className={styles.flexLabel}>
            <span>Toggle Caught</span>
            <ToggleBtn
              name="toggle-caught"
              title="Toggle Caught"
              className={cn(styles.toggle, { [styles.disabledBall]: filters.hideCaught })}
              value={filters.hideCaught}
              inverted
              onToggle={(active) => {
                store.setHideCaught(active)
              }}
            >
              <PokeballIcon
                style={{
                  // opacity: filters.hideCaught ? 0.75 : 1,
                  transform: filters.hideCaught ? 'none' : 'rotate(25deg)',
                }}
              />
            </ToggleBtn>
          </label>
        )}
        <label className={styles.flexLabel}>
          <span>Track forms</span>
          <ToggleBtn
            name="toggle-forms"
            title="Toggle Forms"
            className={cn(styles.toggle)}
            value={filters.hideForms}
            inverted
            onToggle={(active) => {
              store.setHideForms(active)
            }}
          >
            <PawPrintIcon
              style={{
                // opacity: filters.hideForms ? 0.8 : 1,
                transform: filters.hideForms ? 'rotate(-25deg) scale(1.1)' : 'rotate(0deg)',
              }}
            />
          </ToggleBtn>
        </label>
        {currentDexState && (
          <>
            <hr />
            <label className={styles.flexLabel}>
              <span>Shiny sprites</span>
              <ToggleBtn
                name="toggle-shiny"
                title="Toggle Shiny"
                className={cn(styles.toggle)}
                value={filters.shinyMode}
                onToggle={(active) => {
                  store.setShinyMode(active)
                }}
              >
                <ShinyIcon
                  style={{
                    // opacity: filters.shinyMode ? 1 : 0.6,
                    transform: filters.shinyMode ? 'scale(0.9)' : 'none',
                  }}
                />
              </ToggleBtn>
            </label>
          </>
        )}
        <hr />
        <label className={styles.flexLabel}>
          <span>Download data</span>
          <DownloadTextButton
            filename="superpokedextracker-data.json"
            content={jsonState}
            name="download-data"
            title="Download data"
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
          name="upload-data"
          onUpload={handleJsonUpload}
        >
          <UploadIcon data-nofill />
        </FileUploadBtn>
        <hr />
        <div className={styles.appVersion}>
          <b>{config.title}</b>
          <span>v{config.version}</span>
        </div>
      </DrawerMenu>
    </div>
  )
}
