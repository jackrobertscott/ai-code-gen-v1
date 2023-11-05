export const Button = ({ label }: { label: string }) => {
  return <button>{label}</button>
}

export const App = () => {
  return (
    <div>
      <Button label="Hello, World!" />
    </div>
  )
}
