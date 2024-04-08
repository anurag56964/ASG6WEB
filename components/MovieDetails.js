import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function MovieDetails(props) {
  return (
    <>
      <Container>
        <Row>
          {props.movie.poster ? (
            <Col md>
              <img src={props.movie.poster} alt="poster" className="w-100" />
              <br />
              <br />
            </Col>
          ) : (
            <Col md>...</Col>
          )}
          <Col md>
            <strong>DIRECTED BY: </strong>
            {props.movie.directors
              .map((directors) => `${directors}`)
              .join(", ")}{" "}
            <br /> <br />
            <p>{props.movie.fullplot}</p>
            <strong>Cast: </strong>{" "}
            {props.movie.cast
              ? props.movie.cast.map((cast) => `${cast}`).join(", ")
              : "N/A"}
            <br />
            <strong>AWARDS: </strong> {props.movie.awards.text}
            <br />
            <strong>IMDB RATING: </strong> {props.movie.imdb.rating}(
            {props.movie.imdb.votes})
            <br />
          </Col>
        </Row>
      </Container>
    </>
  );
}


