import { Close2Icon } from '@/lib/icons'
import { readClientCookie, setClientCookie } from '@/lib/utils/cookies'
import { useState } from 'react'
import styles from './AppMainText.module.scss'

const dismissCookieName = '_home_main_dismissed_0'
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
      <article>
        <button className={styles.dismissTrigger} title="Close" type="button" onClick={handleDismissArticle}>
          <Close2Icon />
        </button>
        Online Pokédex Tracker that saves your progress locally, without the need for an account.
        <p>
          Developed by the creators of{' '}
          <a href="https://supereffective.gg" target="_blank" rel="noreferrer">
            SuperEffective.gg
          </a>
          , a cloud-based version with a Living Dex Box Organizer and many other tools.
        </p>
      </article>
    </main>
  )
}

export default AppMainText
