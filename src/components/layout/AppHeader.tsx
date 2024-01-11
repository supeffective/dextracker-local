import config from '@/config'
import { HeartHandshakeIcon } from '@/lib/icons/actions'
import { DiscordIcon, GithubIcon } from '@/lib/icons/brands'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import appLogo from '/logo.png'
import styles from './AppHeader.module.scss'

type AppHeaderProps = {
  children?: never
} & ComponentPropsWithoutRef<'header'>

export default function AppHeader({ className, ...props }: AppHeaderProps) {
  return (
    <header className={cn(styles.header, className)} {...props}>
      <a className={styles.title} href={import.meta.env.BASE_URL}>
        <img src={appLogo} alt="" />
        <h1>Super Pokédex Tracker</h1>
      </a>
      <div className={styles.links}>
        <a href={config.patreon_url} target="_blank" rel="noreferrer" title="Support this project on Patreon">
          <HeartHandshakeIcon style={{ strokeWidth: '3px' }} />
        </a>
        <a href={config.discord_url} target="_blank" rel="noreferrer" title="Discord Server">
          <DiscordIcon data-filled />
        </a>
        <a href={config.github_url} target="_blank" rel="noreferrer" title="GitHub Repository">
          <GithubIcon data-filled />
        </a>
      </div>
    </header>
  )
}
