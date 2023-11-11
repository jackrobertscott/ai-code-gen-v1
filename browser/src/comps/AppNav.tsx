import { Link } from "react-router-dom"

export const AppNav = ({
  links,
}: {
  links: { to: string; label: string }[]
}) => {
  return (
    <nav>
      <ul>
        {links.map((link) => {
          return (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
