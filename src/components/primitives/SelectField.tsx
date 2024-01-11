import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, useId } from 'react'
import styles from './SelectField.module.scss'

export type SelectFieldOption = { value: string; label?: string }

type SelectFieldProps = {
  label?: React.ReactNode
  value?: string
  options: SelectFieldOption[]
} & Omit<
  ComponentPropsWithoutRef<'select'>,
  'children' | 'selected' | 'value' | 'defaultValue' | 'defaultChecked' | 'onSelect'
>

export type SelectFieldPropsWithoutOptions = Omit<SelectFieldProps, 'options' | 'children'>

export const OPTIONS_LOADING: SelectFieldOption[] = [{ value: '', label: 'Loading...' }]
export const OPTIONS_ERROR: SelectFieldOption[] = [{ value: '', label: '~Loading Error~' }]
export const OPTIONS_DATA_NOT_LOADED: SelectFieldOption[] = [{ value: '', label: '~Data not Loaded~' }]
export const OPTIONS_NO_DATA: SelectFieldOption[] = [{ value: '', label: '~No Data~' }]

export default function SelectField({ className, options, value, label, ...props }: SelectFieldProps) {
  const fieldId = useId()
  const strValue = value === undefined ? '' : String(value)
  const optionsToRender = options?.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label ?? option.value}
    </option>
  ))

  const labelElement = label ? (
    <label htmlFor={fieldId} className={styles.label}>
      {label}
    </label>
  ) : null
  const selectedOption = options?.find((option) => option.value === strValue)

  return (
    <div className={cn(styles.box, className)} title={selectedOption?.label}>
      {labelElement}
      <select id={fieldId} className={styles.field} value={strValue} {...props}>
        {optionsToRender}
      </select>
    </div>
  )
}
