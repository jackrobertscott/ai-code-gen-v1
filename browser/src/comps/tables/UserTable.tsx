import { useEffect, useState } from "react"
import { latestUpdate } from "../forms/UserForm"

const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:4000/users/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} error`)
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
  }
}

export const UserTable = () => {
  const [users, setUsers] = useState<any[]>()
  useEffect(() => {
    getUsers().then(setUsers)
  }, [latestUpdate.value])
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.country}</td>
              </tr>
            )
          })}
        <tr></tr>
      </tbody>
    </table>
  )
}

const USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    age: "28",
    country: "United States",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    age: "34",
    country: "Canada",
  },
  {
    id: 3,
    name: "Sofía García",
    email: "sofiagarcia@example.com",
    age: "30",
    country: "Spain",
  },
  {
    id: 4,
    name: "Aarav Patel",
    email: "aaravpatel@example.com",
    age: "26",
    country: "India",
  },
  {
    id: 5,
    name: "Chen Wei",
    email: "chenwei@example.com",
    age: "29",
    country: "China",
  },
]
