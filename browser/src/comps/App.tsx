import { Route, Routes } from "react-router-dom"
import { AppNav } from "./AppNav"
import { UsersPage } from "./pages/UsersPage"

export const App = () => {
  return (
    <>
      <header>
        <h1>My App</h1>
      </header>
      <AppNav
        links={[
          { to: "/", label: "Dashboard" },
          { to: "/users", label: "Users" },
          { to: "/settings", label: "Settings" },
          { to: "/help", label: "Help" },
        ]}
      />
      <main>
        <Routes>
          <Route path="/" element={"Hello, World!"} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={"404 Page not found"} />
        </Routes>
      </main>
    </>
  )
}
