import data from '@/data'
import { HeartHandshakeIcon } from '@/lib/icons/actions'
import { DiscordIcon, GithubIcon } from '@/lib/icons/brands'
import { assetUrl, cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './AppHeader.module.scss'

type AppHeaderProps = {
  children?: never
} & ComponentPropsWithoutRef<'header'>

export default function AppHeader({ className, ...props }: AppHeaderProps) {
  return (
    <header className={cn(styles.header, className)} {...props}>
      <a className={styles.title} href={import.meta.env.BASE_URL}>
        <img src={assetUrl('logo.png')} alt="" />
        <h1>Super Pokédex Tracker</h1>
      </a>
      <div className={styles.links}>
        <a href={data.patreon_url} target="_blank" rel="noreferrer" title="Support this project on Patreon">
          <HeartHandshakeIcon style={{ strokeWidth: '3px' }} />
        </a>
        <a href={data.discord_url} target="_blank" rel="noreferrer" title="Discord Server">
          <DiscordIcon data-filled />
        </a>
        <a href={data.github_url} target="_blank" rel="noreferrer" title="GitHub Repository">
          <GithubIcon data-filled />
        </a>
      </div>
    </header>
  )
}
