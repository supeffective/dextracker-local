import closeIcon from '@/assets/close-2.svg'
import { useState } from 'react'
import styles from './AppMainText.module.scss'

function AppMainText() {
  const [showArticle, setShowArticle] = useState(true)
  const handleDismissArticle = () => {
    setShowArticle(false)
  }
  const mainProps: React.HTMLAttributes<HTMLElement> = {}
  if (!showArticle) {
    mainProps.hidden = true
  }
  return (
    <main className={styles.info} {...mainProps}>
      <article>
        <button className={styles.dismissTrigger} title="Close" type="button" onClick={handleDismissArticle}>
          <img src={closeIcon} alt="Close" />
        </button>
        Online Pokédex Tracker webapp, developed by the creators of{' '}
        <a href="https://supereffective.gg" target="_blank" rel="noreferrer">
          SuperEffective.gg
        </a>
        . Supporting all Pokédexes, all forms and shiny variants.
      </article>
    </main>
  )
}

export default AppMainText
