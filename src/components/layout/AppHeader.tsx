import discordIcon from '@/assets/brands/discord.svg'
import githubIcon from '@/assets/brands/github.svg'
import patreonIcon from '@/assets/brands/patreon.svg'
import data from '@/data'
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
        <a href={data.patreon_url} target="_blank" rel="noreferrer" title="Patreon">
          <img src={patreonIcon} alt="Patreon" />
        </a>
        <a href={data.discord_url} target="_blank" rel="noreferrer" title="Discord">
          <img src={discordIcon} alt="Discord" />
        </a>
        <a href={data.github_url} target="_blank" rel="noreferrer" title="GitHub">
          <img src={githubIcon} alt="GitHub" />
        </a>
      </div>
    </header>
  )
}
