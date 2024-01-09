import fs from 'fs'

function createComponentCommand(componentName: string): void {
  const fullComponentPath = `${process.cwd()}/src/components/${componentName}`
  console.log(`Creating component "${fullComponentPath}"`)
  const scssModuleTemplate = `.${componentName} {\n  display: block;\n}`
  const jsxComponentTemplate = `
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './${componentName}.module.scss'

type ${componentName}Props = {} & ComponentPropsWithoutRef<'div'>

export default function ${componentName}({ className, children, ...props }: ${componentName}Props) {
  return (
    <div className={cn(styles.${componentName}, className)} {...props}>
      {children}
    </div>
  )
}
`

  fs.writeFileSync(`${fullComponentPath}.module.scss`, scssModuleTemplate)
  fs.writeFileSync(`${fullComponentPath}.tsx`, `${jsxComponentTemplate.trim()}\n`)

  console.log('DONE.')
}

const componentName = String(process.argv[2] ?? '')
  .trim()
  .replace(/[^a-zA-Z0-9-_]/gi, '')

if (!componentName) {
  console.error('Component name is required')
  process.exit(1)
}

createComponentCommand(componentName)
