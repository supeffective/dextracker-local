import config from '@/config'
import { Close2Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { readClientCookie, setClientCookie } from '@/lib/utils/cookies'
import { useState } from 'react'
import styles from './WelcomeBanner.module.scss'

const dismissCookieName = '_home_main_dismissed_v2'
const dismissCookieValue = 'yes'
const dismissCookieMaxAge = process.env.NODE_ENV === 'development' ? 60 : 60 * 60 * 24 * 3 // 3 days (prod) or 1 minute (dev)

function WelcomeBanner() {
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
        <article>
          <p>
            Developed by the creator of {/* biome-ignore lint/a11y/noBlankTarget: <explanation> */}
            <a href="https://supereffective.gg" target="_blank">
              SuperEffective.gg
            </a>
            , a twin site that offers Living Dex Box Organization features, stored in the cloud.
          </p>
        </article>
        <article>
          <p>
            This website is mobile-first, meaning it is optimized for mobile devices, but it works on desktop too. You
            can install it as a PWA (a Progressive Web App) on your mobile (or desktop) device, for a better experience.
            In order to do that, you need to open this website in your browser, and then follow the instructions for
            your specific device:{' '}
            <a
              href="https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid&hl=en"
              target="_blank"
              rel="noreferrer"
            >
              Android
            </a>{' '}
            /{' '}
            <a
              href="https://support.apple.com/guide/iphone/bookmark-favorite-webpages-iph42ab2f3a7/ios"
              target="_blank"
              rel="noreferrer"
            >
              iOS
            </a>
            .
          </p>
        </article>
        <article>
          For Windows, Mac and Linux, you can install it as a PWA by clicking on the install button in the address bar
          of your browser.
        </article>
      </div>
    </main>
  )
}

export default WelcomeBanner
