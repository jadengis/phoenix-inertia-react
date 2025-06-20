import { createInertiaApp } from '@inertiajs/react'
import ReactDOMServer from 'react-dom/server'

export function render(page: Parameters<typeof createInertiaApp>[0]['page']) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: async (name) => {
      return await import(`./pages/${name}.tsx`)
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
