defmodule InertiaAppWeb.PageController do
  use InertiaAppWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
