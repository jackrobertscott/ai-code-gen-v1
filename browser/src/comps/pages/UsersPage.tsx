import { UserForm } from "../forms/UserForm"
import { UserTable } from "../tables/UserTable"

export const UsersPage = () => {
  return (
    <>
      <section>
        <h2>Users</h2>
        <p>View the details of our app users.</p>
        <UserForm />
        <UserTable />
      </section>
    </>
  )
}
