import { useLocalDatasetQuery } from '@/hooks/useLocalDatasetQuery'
import { TrAppChangelogEntry } from '@/lib/dataset/types'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import TitledSection from '../primitives/TitledSection'
import styles from './ChangelogEntries.module.scss'

type ChangelogEntriesProps = {
  limit?: number
} & Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'title'>

export default function ChangelogEntries({ className, limit = 100, ...props }: ChangelogEntriesProps) {
  const fetchData = useLocalDatasetQuery<Array<TrAppChangelogEntry>>('changelog', limit > 0)
  const title = 'Latest Changes'
  const classNames = cn(styles.panel, className)

  if (fetchData.isLoading) {
    return (
      <TitledSection title={title} className={classNames} {...props}>
        Loading...
      </TitledSection>
    )
  }

  if (fetchData.isError) {
    console.error(fetchData.error)
    return null
  }

  if (!fetchData.data) {
    console.warn('No changelog data found')
    return null
  }

  const entriesByVersion = fetchData.data.reduce(
    (acc, entry) => {
      if (!acc[entry.version]) {
        acc[entry.version] = []
      }
      acc[entry.version].push(entry)
      return acc
    },
    {} as Record<string, Array<TrAppChangelogEntry>>,
  )

  const sortedVersionDesc = Object.keys(entriesByVersion).sort((a, b) => {
    const [aMajor, aMinor, aPatch] = a.split('.').map((n) => parseInt(n))
    const [bMajor, bMinor, bPatch] = b.split('.').map((n) => parseInt(n))

    if (aMajor !== bMajor) {
      return bMajor - aMajor
    }
    if (aMinor !== bMinor) {
      return bMinor - aMinor
    }
    if (aPatch !== bPatch) {
      return bPatch - aPatch
    }
    return 0
  })

  const children = sortedVersionDesc.map((version) => {
    const entries = entriesByVersion[version] ?? []
    const latestDate = entries.reduce((acc, entry) => {
      const entryDate = new Date(entry.date)
      return entryDate > acc ? entryDate : acc
    }, new Date(0))

    return (
      <div key={version} className={styles.versionPanel}>
        <header className={styles.versionHeader}>
          <h3 className={styles.versionTitle}>Version {version}</h3>
          <div className={styles.versionDate}>
            Released on{' '}
            {latestDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </header>
        <ul className={styles.versionEntries}>
          {entries.map((entry, index) => (
            <li key={`${entry.date}-${index}`}>{entry.content}</li>
          ))}
        </ul>
      </div>
    )
  })

  return (
    <TitledSection level={2} title={title} className={classNames} {...props}>
      <div className={styles.versions}>{children}</div>
    </TitledSection>
  )
}
