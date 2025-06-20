import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { Flash, Icon } from './core-components'

type FlashGroupProps = {
  flash: Record<string, string>
  id?: string
  connectionStatus?: 'connected' | 'disconnected'
}

export function FlashGroup({ flash, id = 'flash-group', connectionStatus = 'connected' }: FlashGroupProps) {
  const [clientError, setClientError] = useState(false)
  const [serverError, setServerError] = useState(false)

  // Simulate connection status changes (in a real app, this would come from your WebSocket/network layer)
  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      // In a real app, you'd determine if it's a client or server error
      setClientError(true)
    } else {
      setClientError(false)
      setServerError(false)
    }
  }, [connectionStatus])

  return (
    <div id={id} aria-live="polite">
      <Flash kind="info" flash={flash} />
      <Flash kind="error" flash={flash} />

      <Flash id="client-error" kind="error" title="We can't find the internet" hidden={!clientError}>
        Attempting to reconnect
        <Icon name="hero-arrow-path" className="ml-1 size-3 motion-safe:animate-spin" />
      </Flash>

      <Flash id="server-error" kind="error" title="Something went wrong!" hidden={!serverError}>
        Attempting to reconnect
        <Icon name="hero-arrow-path" className="ml-1 size-3 motion-safe:animate-spin" />
      </Flash>
    </div>
  )
}

type AppLayoutProps = {
  flash: Record<string, string>
  currentScope?: Record<string, unknown>
  children: React.ReactNode
  appVersion?: string
}

export function AppLayout({ flash, children, appVersion = '1.0.0' }: AppLayoutProps) {
  return (
    <>
      <header className="navbar px-4 sm:px-6 lg:px-8">
        <div className="flex-1">
          <a href="/" className="flex-1 flex w-fit items-center gap-2">
            <img src="/images/logo.svg" width="36" alt="Logo" />
            <span className="text-sm font-semibold">v{appVersion}</span>
          </a>
        </div>
        <div className="flex-none">
          <ul className="flex flex-column px-1 space-x-4 items-center">
            <li>
              <a href="https://phoenixframework.org/" className="btn btn-ghost">
                Website
              </a>
            </li>
            <li>
              <a href="https://github.com/phoenixframework/phoenix" className="btn btn-ghost">
                GitHub
              </a>
            </li>
            <li>
              <ThemeToggle />
            </li>
            <li>
              <a href="https://hexdocs.pm/phoenix/overview.html" className="btn btn-primary">
                Get Started <span aria-hidden="true">&rarr;</span>
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-4">{children}</div>
      </main>

      <FlashGroup flash={flash} />
    </>
  )
}

export function ThemeToggle() {
  return (
    <div className="card relative flex flex-row items-center border-2 border-base-300 bg-base-300 rounded-full">
      <div className="absolute w-1/3 h-full rounded-full border-1 border-base-200 bg-base-100 brightness-200 left-0 [[data-theme=light]_&]:left-1/3 [[data-theme=dark]_&]:left-2/3 transition-[left]" />

      <button
        onClick={() => {
          window.dispatchEvent(new CustomEvent('phx:set-theme', { detail: { theme: 'system' } }))
        }}
        className="flex p-2 cursor-pointer w-1/3"
      >
        <ComputerDesktopIcon className="size-4 opacity-75 hover:opacity-100" />
      </button>

      <button
        onClick={() => {
          window.dispatchEvent(new CustomEvent('phx:set-theme', { detail: { theme: 'light' } }))
        }}
        className="flex p-2 cursor-pointer w-1/3"
      >
        <SunIcon className="size-4 opacity-75 hover:opacity-100" />
      </button>

      <button
        onClick={() => {
          window.dispatchEvent(new CustomEvent('phx:set-theme', { detail: { theme: 'dark' } }))
        }}
        className="flex p-2 cursor-pointer w-1/3"
      >
        <MoonIcon className="size-4 opacity-75 hover:opacity-100" />
      </button>
    </div>
  )
}
