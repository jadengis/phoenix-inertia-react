# Phoenix Inertia React Template

A modern full-stack web application template combining the power of Phoenix Framework with React via Inertia.js. This template provides a production-ready foundation for building interactive web applications with server-side routing and client-side rendering.

## Features

- **Phoenix Framework** - Robust, battle-tested Elixir web framework
- **Inertia.js** - Modern monolith approach with server-side routing and client-side rendering
- **React 19** - Latest React with TypeScript support
- **TailwindCSS + DaisyUI** - Modern CSS framework with component library
- **Server-Side Rendering (SSR)** - Fast initial page loads
- **Hot Reloading** - Development experience with instant feedback
- **Umbrella Application** - Organized code structure separating business logic from web interface
- **SQLite Database** - Simple, file-based database for development
- **Testing Setup** - Comprehensive testing with ExUnit and React Testing Library
- **Docker Support** - Containerized deployment ready

## Quick Start

### Prerequisites

- Elixir 1.15+
- Erlang/OTP 26+
- Node.js 18+
- SQLite3

### Installation

1. **Clone and setup the project:**
   ```bash
   git clone <your-repo-url>
   cd your-project-name
   mix setup
   ```

2. **Start the development server:**
   ```bash
   mix phx.server
   ```

3. **Visit your application:**
   Open [http://localhost:4000](http://localhost:4000) in your browser.

## Development

### Running Tests

```bash
# Run Elixir tests
mix test

# Run JavaScript/React tests
npm run --prefix assets test

# Run all tests
mix test && npm run --prefix assets test
```

### Code Quality

```bash
# Format Elixir code
mix format

# Format JavaScript/TypeScript code
npm run --prefix assets format:write

# Lint JavaScript/TypeScript
npm run --prefix assets lint

# Type check
npm run --prefix assets typecheck
```

### Database Operations

```bash
# Create and migrate database
mix ecto.setup

# Reset database
mix ecto.reset

# Create new migration
mix ecto.gen.migration create_users

# Run migrations
mix ecto.migrate
```

### Asset Management

```bash
# Build assets for development
mix assets.build

# Build assets for production
mix assets.deploy

# Setup asset dependencies
mix assets.setup
```

## Project Structure

```
├── apps/
│   ├── inertia_app/          # Business logic and data layer
│   │   ├── lib/
│   │   │   └── inertia_app/
│   │   │       ├── application.ex
│   │   │       ├── repo.ex
│   │   │       └── mailer.ex
│   │   └── priv/repo/        # Database migrations and seeds
│   └── inertia_app_web/      # Web interface and controllers
│       ├── lib/
│       │   └── inertia_app_web/
│       │       ├── controllers/
│       │       ├── components/
│       │       ├── endpoint.ex
│       │       └── router.ex
│       └── priv/static/      # Compiled assets
├── assets/                   # Frontend source code
│   ├── js/
│   │   ├── app.tsx          # Main React application
│   │   ├── ssr.tsx          # Server-side React application
│   │   ├── components/      # Reusable React components
│   │   └── pages/           # Inertia.js pages
│   └── css/
│       └── app.css          # TailwindCSS styles
├── config/                  # Application configuration
└── mix.exs                  # Umbrella project configuration
```

## Customizing for Your Project

This template uses placeholder names that you'll want to replace with your actual project names. Use the provided rename script to automatically update all occurrences:

### Using the Rename Script

Run the rename script to update all project identifiers:

```bash
# Make the script executable
chmod +x rename_project.sh

# Run the script with your project names
./rename_project.sh YourApp your_app your-app
```

**Parameters:**
- `YourApp` - PascalCase module name (e.g., `BlogApp`, `EcommerceStore`)
- `your_app` - snake_case name for Elixir (e.g., `blog_app`, `ecommerce_store`)
- `your-app` - kebab-case name for package.json (e.g., `blog-app`, `ecommerce-store`)

### Manual Customization

If you prefer to rename manually, update these key identifiers throughout the codebase:

1. **InertiaApp** → **YourApp** (PascalCase for Elixir modules)
2. **inertia_app** → **your_app** (snake_case for Elixir atoms, file names)
3. **inertia-app** → **your-app** (kebab-case for package.json name)

Key files to update:
- `mix.exs` (umbrella and individual app configs)
- `config/*.exs` (all configuration files)
- `assets/package.json`
- All module definitions in `apps/*/lib/`
- Database configuration and migrations

## Deployment

### Using Docker

```bash
# Build the Docker image
docker build -t your-app .

# Run the container
docker run -p 4000:4000 your-app
```

### Traditional Deployment

1. **Build a release:**
   ```bash
   MIX_ENV=prod mix release
   ```

2. **Run the release:**
   ```bash
   _build/prod/rel/inertia_app_web/bin/inertia_app_web start
   ```

## Architecture Notes

### Umbrella Application Structure

This template uses Phoenix's umbrella application pattern:

- **`inertia_app`** - Contains business logic, data models, and database operations
- **`inertia_app_web`** - Contains web-specific code like controllers, views, and routing

This separation allows for:
- Better code organization
- Easier testing of business logic
- Potential for multiple web interfaces
- Cleaner dependency management

### Inertia.js Integration

Inertia.js provides a modern approach to building SPAs:

- **Server-side routing** - All routes defined in Phoenix
- **Client-side rendering** - React handles the UI
- **No API needed** - Direct data passing from controllers to React components
- **SSR support** - Fast initial page loads with server-side rendering

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

- [Phoenix Framework Documentation](https://hexdocs.pm/phoenix/)
- [Inertia.js Documentation](https://inertiajs.com/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)

## Template Information

This template provides a solid foundation for building modern web applications. It combines the reliability of Phoenix with the interactivity of React, giving you the best of both server-side and client-side development.
