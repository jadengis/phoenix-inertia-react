import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import React, { useState } from 'react'

// Flash Component
interface FlashProps extends HTMLAttributes<HTMLDivElement> {
  id?: string
  flash?: Record<string, string>
  title?: string
  kind: 'info' | 'error'
  children?: ReactNode
}

export const Flash: React.FC<FlashProps> = ({ id, flash = {}, title, kind, children, ...rest }) => {
  const message = children || flash[kind]
  const flashId = id || `flash-${kind}`
  const [isOpen, setIsOpen] = useState(!!message)

  if (!isOpen) return null

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div id={flashId} role="alert" className="toast toast-top toast-end z-50" {...rest}>
      <div
        className={`alert w-80 sm:w-96 max-w-80 sm:max-w-96 text-wrap ${
          kind === 'info' ? 'alert-info' : 'alert-error'
        }`}
      >
        {kind === 'info' && <Icon name="hero-information-circle" className="size-5 shrink-0" />}
        {kind === 'error' && <Icon name="hero-exclamation-circle" className="size-5 shrink-0" />}
        <div>
          {title && <p className="font-semibold">{title}</p>}
          <p>{message}</p>
        </div>
        <div className="flex-1" />
        <button type="button" className="group self-start cursor-pointer" aria-label="close" onClick={handleClose}>
          <Icon name="hero-x-mark" className="size-5 opacity-40 group-hover:opacity-70" />
        </button>
      </div>
    </div>
  )
}

// Button Component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary'
  href?: string
  navigate?: string
  patch?: string
  method?: string
  children: ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  href,
  navigate,
  patch,
  method,
  children,
  className,
  ...rest
}) => {
  const variants = {
    primary: 'btn-primary',
    undefined: 'btn-primary btn-soft',
  }

  const variantClass = variants[variant as keyof typeof variants] || variants.undefined
  const classes = `btn ${variantClass} ${className || ''}`.trim()

  if (href || navigate || patch) {
    return (
      <a href={href || navigate || patch} className={classes} {...(method && { 'data-method': method })}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

// Error Component
interface ErrorProps {
  children: ReactNode
}

const Error: React.FC<ErrorProps> = ({ children }) => (
  <p className="mt-1.5 flex gap-2 items-center text-sm text-error">
    <Icon name="hero-exclamation-circle" className="size-5" />
    {children}
  </p>
)

// Input Component
interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, 'type'> {
  id?: string
  name?: string
  label?: string
  value?: any
  type?:
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'select'
    | 'tel'
    | 'text'
    | 'textarea'
    | 'time'
    | 'url'
    | 'week'
  errors?: string[]
  checked?: boolean
  prompt?: string
  options?: Array<{ value: string | number; label: string }>
  multiple?: boolean
  errorClass?: string
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  value,
  type = 'text',
  errors = [],
  checked,
  prompt,
  options = [],
  multiple = false,
  className,
  errorClass,
  ...rest
}) => {
  if (type === 'checkbox') {
    return (
      <fieldset className="fieldset mb-2">
        <label>
          <input type="hidden" name={name} value="false" disabled={rest.disabled} />
          <span className="label">
            <input
              type="checkbox"
              id={id}
              name={name}
              value="true"
              checked={checked || value}
              className={className || 'checkbox checkbox-sm'}
              {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            />
            {label}
          </span>
        </label>
        {errors.map((msg, idx) => (
          <Error key={idx}>{msg}</Error>
        ))}
      </fieldset>
    )
  }

  if (type === 'select') {
    return (
      <fieldset className="fieldset mb-2">
        <label>
          {label && <span className="label mb-1">{label}</span>}
          <select
            id={id}
            name={name}
            className={`${className || 'w-full select'} ${errors.length > 0 ? errorClass || 'select-error' : ''}`}
            multiple={multiple}
            value={value}
            {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {prompt && <option value="">{prompt}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        {errors.map((msg, idx) => (
          <Error key={idx}>{msg}</Error>
        ))}
      </fieldset>
    )
  }

  if (type === 'textarea') {
    return (
      <fieldset className="fieldset mb-2">
        <label>
          {label && <span className="label mb-1">{label}</span>}
          <textarea
            id={id}
            name={name}
            className={`${className || 'w-full textarea'} ${errors.length > 0 ? errorClass || 'textarea-error' : ''}`}
            value={value}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        </label>
        {errors.map((msg, idx) => (
          <Error key={idx}>{msg}</Error>
        ))}
      </fieldset>
    )
  }

  // All other input types
  return (
    <fieldset className="fieldset mb-2">
      <label>
        {label && <span className="label mb-1">{label}</span>}
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          className={`${className || 'w-full input'} ${errors.length > 0 ? errorClass || 'input-error' : ''}`}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      </label>
      {errors.map((msg, idx) => (
        <Error key={idx}>{msg}</Error>
      ))}
    </fieldset>
  )
}

// Header Component
interface HeaderProps {
  className?: string
  children: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
}

export const Header: React.FC<HeaderProps> = ({ className, children, subtitle, actions }) => {
  const classes = [actions && 'flex items-center justify-between gap-6', 'pb-4', className].filter(Boolean).join(' ')

  return (
    <header className={classes}>
      <div>
        <h1 className="text-lg font-semibold leading-8">{children}</h1>
        {subtitle && <p className="text-sm text-base-content/70">{subtitle}</p>}
      </div>
      {actions && <div className="flex-none">{actions}</div>}
    </header>
  )
}

// Table Component
interface TableColumn<T> {
  label: string
  render: (item: T) => ReactNode
}

interface TableAction<T> {
  render: (item: T) => ReactNode
}

interface TableProps<T> {
  id: string
  rows: T[]
  rowId?: (row: T) => string
  rowClick?: (row: T) => void
  rowItem?: (row: T) => T
  columns: TableColumn<T>[]
  actions?: TableAction<T>[]
}

export function Table<T>({ id, rows, rowId, rowClick, rowItem = (row) => row, columns, actions = [] }: TableProps<T>) {
  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col.label}</th>
          ))}
          {actions.length > 0 && (
            <th>
              <span className="sr-only">Actions</span>
            </th>
          )}
        </tr>
      </thead>
      <tbody id={id}>
        {rows.map((row, rowIdx) => {
          const item = rowItem(row)
          const key = rowId ? rowId(row) : rowIdx

          return (
            <tr key={key} id={String(key)}>
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  onClick={rowClick ? () => rowClick(row) : undefined}
                  className={rowClick ? 'hover:cursor-pointer' : undefined}
                >
                  {col.render(item)}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="w-0 font-semibold">
                  <div className="flex gap-4">
                    {actions.map((action, actionIdx) => (
                      <React.Fragment key={actionIdx}>{action.render(item)}</React.Fragment>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// List Component
interface ListItem {
  title: string
  content: ReactNode
}

interface ListProps {
  items: ListItem[]
}

export const List: React.FC<ListProps> = ({ items }) => {
  return (
    <ul className="list">
      {items.map((item, idx) => (
        <li key={idx} className="list-row">
          <div>
            <div className="font-bold">{item.title}</div>
            <div>{item.content}</div>
          </div>
        </li>
      ))}
    </ul>
  )
}

// Icon Component
interface IconProps {
  name: string
  className?: string
}

export const Icon: React.FC<IconProps> = ({ name, className = 'size-4' }) => {
  if (name.startsWith('hero-')) {
    return <span className={`${name} ${className}`} />
  }
  return null
}
