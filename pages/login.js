import { Card, Form, Alert, Button } from "react-bootstrap"
import { useState } from "react"
import { authenticateUser } from "@/lib/authenticate"
import { useRouter } from "next/router"
import { useAtom } from "jotai"
import { searchHistoryAtom, favouritesAtom } from "@/store"
import { getFavourites, getHistory } from "@/lib/userData"

export default function Login(props) {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [warning, setWarning] = useState("")
  const router = useRouter()
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  async function updateAtoms() {
    setFavouritesList(await getFavourites())
    setSearchHistory(await getHistory())
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await authenticateUser(user, password)
      await updateAtoms()
      console.log("Hi", getFavourites())
      router.push("/favourites")
    } catch (err) {
      setWarning(err.message)
    }
  }

  return (
    <>
      {router.query.registered && (
        <>
          <br />
          <Alert variant="primary">REGISTRATION SUCCESSFULLLLL</Alert>
        </>
      )}
      <Card bg="light">
        <Card.Body>
          <h2>LOGIN</h2>ENTER LOGIN INFO----
          <br />
          <sub>
            (demo username: <b>deeemo</b>, password: <b>56964</b>)
          </sub>
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
          <Form.Label>PASS:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />

        <Button variant="primary" className="pull-right" type="submit">
          Login
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