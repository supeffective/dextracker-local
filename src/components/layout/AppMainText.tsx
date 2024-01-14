import config from '@/config'
import { Close2Icon } from '@/lib/icons'
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
    return null
  }

  return (
    <main className={styles.info}>
      <div className={styles.mainText}>
        <button className={styles.dismissTrigger} title="Close" type="button" onClick={handleDismissArticle}>
          <Close2Icon />
        </button>
        <p>
          Online Pokédex Tracker, Living Dex Organizer and Shiny Hunter Dashboard, {config.title} is an all-in-one
          Pokémon gaming companion web application.{' '}
        </p>
        <p>
          Always saving your progress locally, without the need for creating an account. Completely control your data,
          export and import it at any time.
        </p>
        <p style={{ fontSize: '1rem' }}>
          Developed by the creator of{' '}
          <a href="https://supereffective.gg" target="_blank" rel="noreferrer">
            SuperEffective.gg
          </a>
          , a cloud-based version with a Living Dex Box Organizer and many other tools.
        </p>
      </div>
    </main>
  )
}

export default AppMainText
