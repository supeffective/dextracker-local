import config from '@/config'
import { Close2Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { readClientCookie, setClientCookie } from '@/lib/utils/cookies'
import { useState } from 'react'
import styles from './AppMainText.module.scss'

const dismissCookieName = '_home_main_dismissed_v2'
const dismissCookieValue = 'yes'
const dismissCookieMaxAge = process.env.NODE_ENV === 'development' ? 60 : 60 * 60 * 24 * 3 // 3 days (prod) or 1 minute (dev)

function AppMainText() {
  const currentCookieValue = readClientCookie(dismissCookieName)
  const [showArticle, setShowArticle] = useState(currentCookieValue !== dismissCookieValue)

  const handleDismissArticle = () => {
    setShowArticle(false)
    setClientCookie(dismissCookieName, dismissCookieValue, dismissCookieMaxAge)
  }

  if (!showArticle) {
    return <div>&nbsp;</div>
  }

  return (
    <main className={cn(styles.info)}>
      <div className={styles.mainText}>
        <button className={styles.dismissTrigger} title="Close" type="button" onClick={handleDismissArticle}>
          <Close2Icon />
        </button>
        <p>
          Welcome to {config.webapp_short_name}, an online Pokédex Tracker, Living Dex Organizer and Shiny Hunting
          Tracker tool, an all-in-one Pokémon gaming companion.{' '}
        </p>
        <p>
          This site always saves your progress locally, without the need for an account. Completely control your data:
          backup and restore at any time.
        </p>
        <p>
          Developed by the creator of{' '}
          <a href="https://supereffective.gg" target="_blank" rel="noreferrer">
            SuperEffective.gg
          </a>
          , a twin site that offers Living Dex Box Organization features, stored in the cloud.
        </p>
      </div>
    </main>
  )
}

export default AppMainText
