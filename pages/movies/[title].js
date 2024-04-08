import { useRouter } from "next/router";
import useSWR from "swr";
import MovieDetails from "@/components/MovieDetails";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";

export default function Title() {
  const router = useRouter();
  const { title } = router.query;

  if (data === null || data === undefined) {
    return null;
  }

  if (data.length === 0) {
    return <Error statusCode={404} />;
  }
  let list = [];

  data.forEach((movie) => {
    list.push(
      <div>
        <PageHeader text={movie.title} />
        <MovieDetails movie={movie} />
      </div>
    );
  });

  return <>{list}</>;
}
