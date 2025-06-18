defmodule InertiaAppWeb.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      InertiaAppWeb.Telemetry,
      # Start a worker by calling: InertiaAppWeb.Worker.start_link(arg)
      # {InertiaAppWeb.Worker, arg},

      # Start the SSR process pool
      # You must specify a `path` option to locate the directory where the `ssr.js` file lives.
      {Inertia.SSR, path: Application.app_dir(:inertia_app_web, "priv")},

      # Start to serve requests, typically the last entry
      InertiaAppWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: InertiaAppWeb.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    InertiaAppWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
