import { cleanup } from '@testing-library/react'
import { afterEach, before } from 'node:test'

before(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
    disconnect() {
      // do nothing
    }
  }
})

// Clean up after each test
afterEach(() => {
  cleanup()
})
