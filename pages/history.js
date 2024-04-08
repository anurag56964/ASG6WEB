import { useRouter } from "next/router"
import { useAtom } from "jotai"
import { searchHistoryAtom } from "@/store"
import Card from "react-bootstrap/Card"
import { ListGroup } from "react-bootstrap"
import { Button } from "react-bootstrap"
import styles from "@/styles/History.module.css"
import { removeFromHistory } from "@/lib/userData"

export default function searchHistory() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  if (!searchHistory) return null
  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });
  const router = useRouter();
  function historyClicked(e, index) {
    router.push(`artwork?${[searchHistory[index]]}`);
  }
  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }
  console.log(parsedHistory);
  return (
    <>
      <br />
      <Row className="gy-4">
        {parsedHistory.length > 0 ? (
          <ListGroup>
            {parsedHistory.map((data, index) => (
              <ListGroup.Item onClick={(e) => historyClicked(e, index)}>
                {Object.keys(data).map((key) => (
                  <>
                    {key}: <strong>{data[key]}</strong>&nbsp;
                  </>
                ))}
                <Button
                  className="float-end"
                  variant="danger"
                  size="sm"
                  onClick={(e) => removeHistoryClicked(e, index)}>
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Card>
            &nbsp;
            <h4>NOTHING FOUND</h4>
            <p>TRY AGAIN</p>
          </Card>
        )}
      </Row>
      <br />
    </>
  );
}
