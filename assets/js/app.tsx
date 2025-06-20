// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//
// If you have dependencies that try to import CSS, esbuild will generate a separate `app.css` file.
// To load it, simply add a second `<link>` to your `root.html.heex` file.
import { createInertiaApp } from '@inertiajs/react'
import axios from 'axios'
import { hydrateRoot } from 'react-dom/client'

axios.defaults.xsrfHeaderName = 'x-csrf-token'

createInertiaApp({
  resolve: async (name) => {
    return await import(`./pages/${name}.tsx`)
  },
  setup({ App, el, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})

declare global {
  interface Window {
    /**
     * The Phoenix Live Reloader.
     */
    liveReloader?: unknown
  }
}

type EventWithReloader = Event & {
  detail?: {
    enableServerLogs: () => void
    openEditorAtCaller: (target: EventTarget | null) => void
    openEditorAtDef: (target: EventTarget | null) => void
  }
}

// The lines below enable quality of life phoenix_live_reload
// development features:
//
//     1. stream server logs to the browser console
//     2. click on elements to jump to their definitions in your code editor
//
if (process.env.NODE_ENV === 'development') {
  window.addEventListener('phx:live_reload:attached', ({ detail: reloader }: EventWithReloader) => {
    // Enable server log streaming to client.
    // Disable with reloader.disableServerLogs()
    reloader?.enableServerLogs()

    // Open configured PLUG_EDITOR at file:line of the clicked element's HEEx component
    //
    //   * click with "c" key pressed to open at caller location
    //   * click with "d" key pressed to open at function component definition location
    let keyDown: KeyboardEvent['key'] | null = null
    window.addEventListener('keydown', (e) => (keyDown = e.key))
    window.addEventListener('keyup', () => (keyDown = null))
    window.addEventListener(
      'click',
      (e) => {
        if (keyDown === 'c') {
          e.preventDefault()
          e.stopImmediatePropagation()
          reloader?.openEditorAtCaller(e.target)
        } else if (keyDown === 'd') {
          e.preventDefault()
          e.stopImmediatePropagation()
          reloader?.openEditorAtDef(e.target)
        }
      },
      true,
    )

    window.liveReloader = reloader
  })
}
