import { signal } from "@preact/signals-react"
import { ChangeEventHandler, FormEventHandler, useState } from "react"

export const latestUpdate = signal(Date.now())

export const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    country: "",
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch("http://localhost:4000/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} error`)
      }
      const result = await response.json()
      latestUpdate.value = Date.now()
      console.log(result)
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </li>
        <li>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </li>
        <li>
          <label>
            Age
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
        </li>
        <li>
          <label>
            Country
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
            />
          </label>
        </li>
        <li>
          <button type="submit">Submit</button>
        </li>
      </ul>
    </form>
  )
}
