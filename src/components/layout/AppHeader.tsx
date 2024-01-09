import data from '@/data'
import { DiscordIcon, GithubIcon, PatreonIcon } from '@/lib/icons/brands'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './AppHeader.module.scss'
import appLogo from '/logo.png'

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
        <a href={data.patreon_url} target="_blank" rel="noreferrer" title="Patreon">
          <PatreonIcon data-filled />
        </a>
        <a href={data.discord_url} target="_blank" rel="noreferrer" title="Discord">
          <DiscordIcon data-filled />
        </a>
        <a href={data.github_url} target="_blank" rel="noreferrer" title="GitHub">
          <GithubIcon data-filled />
        </a>
      </div>
    </header>
  )
}
