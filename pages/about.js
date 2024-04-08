import Link from "next/link";
import { Card } from "react-bootstrap";
import MovieDetails from "@/components/MovieDetails";
import PageHeader from "@/components/PageHeader";

export const About = ({props}) => {
  return (
    <>
      <PageHeader title="DEVELOPER PAGE: ANURAG DAS"/>
      <Card>
        <Card.Body>
          <p>
            THIS IS ANURAG DAS FROM BANGLADESH !
          </p>
          <p>
            FAVOURITE MOVIES:
            <Link href="/movies/Gertie the Dinosaur">{props.movie.title}</Link>
          </p>
        </Card.Body>
      </Card>
      <MovieDeails movie={props.movie}/>
    </>
  )
}

export function getStaticProps() {
  return new Promise((resolve, reject) => {
    fetch(
      `https://cloud.cyclic.app/api/movies?page=1&perPage=20&title=Gertie%20the%20Dinosaur`
    )
      .then((res) => res.json())
      .then((data) =>
        fetch(
          `https://cloud-tan-xerus.cyclic.app/api/movies/${data[0]._id}`
        )
          .then((res) => res.json())
          .then((data) => resolve({ props: { movie: data } }))
      );
  });
}