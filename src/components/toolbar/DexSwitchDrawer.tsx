import { routeFactory } from '@/kernel/routes'
import { getDexSourceCodeUrl } from '@/kernel/urls'
import { GithubIcon } from '@/lib/icons/brands'
import { cn } from '@/lib/utils'
import { useCurrentDexData } from '@/stores/useCurrentDexData'
import { useRouteNavigator } from '@/stores/useRouterStore'
import GameIndicator from '../GameIndicator'
import GameSelectField from '../GameSelectField'
import PokedexSelectField from '../PokedexSelectField'
import DrawerMenu, { DrawerMenuProps } from '../primitives/DrawerMenu'
import styles from './DexSwitchDrawer.module.scss'

export default function DexSwitchDrawer({ className, children, ...props }: DrawerMenuProps) {
  const { info: currentDex, state: currentDexState } = useCurrentDexData()
  const navigate = useRouteNavigator()
  const gameIcon = <GameIndicator className={cn('avatar-raised')} gameId={currentDexState?.gameId ?? 'home'} />

  if (!currentDexState || !currentDex) {
    return null
  }

  return (
    <DrawerMenu
      className={cn(styles.drawer, className)}
      placement="left"
      icon={gameIcon}
      buttonName="switch-pokedex"
      buttonTitle="Switch Pokédex"
      {...props}
    >
      <GameSelectField
        className={styles.selectField}
        label="Game: "
        name="game-select"
        value={currentDexState.gameId}
        onChange={(e) => {
          // state.setCurrentGame(e.target.value)
          navigate(routeFactory.pokedex(null, e.target.value))
        }}
      />
      <PokedexSelectField
        className={styles.selectField}
        label="Dex: "
        name="dex-select"
        gameId={currentDexState.gameId}
        value={currentDexState.dexId}
        onChange={(e) => {
          // state.setCurrentDex(e.target.value)
          navigate(routeFactory.pokedex(e.target.value, currentDexState.gameId))
        }}
      />
      {children}
      <hr />
      <div className={styles.links}>
        <a href={getDexSourceCodeUrl(currentDex.region, currentDex.id)} target="_blank" rel="noreferrer">
          <GithubIcon />
          <span>Edit source code</span>
        </a>
      </div>
    </DrawerMenu>
  )
}
