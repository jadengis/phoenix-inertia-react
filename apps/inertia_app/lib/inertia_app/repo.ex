defmodule InertiaApp.Repo do
  use Ecto.Repo,
    otp_app: :inertia_app,
    adapter: Ecto.Adapters.SQLite3
end
