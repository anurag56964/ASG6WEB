import { Card, Form, Alert, Button } from "react-bootstrap"
import { useState } from "react"
import { registerUser } from "@/lib/authenticate"
import { useRouter } from "next/router"

export default function Register(props) {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [warning, setWarning] = useState("")
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await registerUser(user, password, password2)
      router.push({ pathname: "/login", query: { registered: true } }, "/login")
    } catch (err) {
      setWarning(err.message)
    }
  }
  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>REGISTRAION</h2>FILL TO RAGISTER:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>USERNAME:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>PASSWORD:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>CONFIRM PASSWORD:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            id="password2"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Register
        </Button>
      </Form>
      {warning && (
        <>
          <br />
          <Alert variant="danger">{warning}</Alert>
        </>
      )}
    </>
  )
}