import fs from 'node:fs'
import path from 'node:path'
import { TrAppChangelogEntry } from '@/lib/dataset/types'
import pkg from '../../package.json'

const CHANGELOG_FILE = `${process.cwd()}/public/data/changelog.min.json`

if (!fs.existsSync(path.dirname(CHANGELOG_FILE))) {
  fs.mkdirSync(path.dirname(CHANGELOG_FILE), { recursive: true })
}

if (!fs.existsSync(CHANGELOG_FILE)) {
  fs.writeFileSync(CHANGELOG_FILE, '[]')
}

const currentData: TrAppChangelogEntry[] = JSON.parse(fs.readFileSync(CHANGELOG_FILE, 'utf-8'))
const currentVersion = pkg.version

function addChange(version: string, change: string) {
  currentData.unshift({
    version,
    content: change,
    date: new Date().toISOString(),
  })

  fs.writeFileSync(CHANGELOG_FILE, JSON.stringify(currentData))
}

const args = process.argv.slice(2)

if (args.length === 0) {
  console.log('Usage: bun make:changelog <change description>')
  process.exit(1)
}

const change = args.join(' ')
addChange(currentVersion, change)

console.log(`Done. Added a new changelog entry for version ${currentVersion}`)
