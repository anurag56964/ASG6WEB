import ArtworkCard from "@/components/ArtworkCard";
import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  if (!favouritesList) return null
  return (
    <>
      <br />
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
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
