import fs from 'fs'

function createComponentCommand(componentName: string, componentTag = 'div'): void {
  const fullComponentPath = `${process.cwd()}/src/components/${componentName}`
  console.log(`Creating component "${fullComponentPath}"`)
  const scssModuleTemplate = '.root {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n'
  const jsxComponentTemplate = `
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './${componentName}.module.scss'

type ${componentName}Props = {\n  \n} & Omit<ComponentPropsWithoutRef<'${componentTag}'>, 'children'>

export default function ${componentName}({ className, children, ...props }: ${componentName}Props) {
  return (
    <${componentTag} className={cn(styles.root, className)} {...props}>
      {children}
    </${componentTag}>
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

const componentTag = String(process.argv[3] ?? 'div')

if (!componentName) {
  console.error('Component name is required')
  process.exit(1)
}

createComponentCommand(componentName, componentTag)
