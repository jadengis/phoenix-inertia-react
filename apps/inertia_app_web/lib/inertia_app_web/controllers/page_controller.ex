defmodule InertiaAppWeb.PageController do
  use InertiaAppWeb, :controller

  def home(conn, _params) do
    conn
    |> assign_prop(:phoenix_vsn, Application.spec(:phoenix, :vsn) |> to_string())
    |> render_inertia("home")
  end
end
