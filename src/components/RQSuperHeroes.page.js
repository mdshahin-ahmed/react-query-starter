import { Button, Input } from "semantic-ui-react";
import {
  useAddSuperHeroData,
  useSuperHeroData,
} from "../hooks/useSuperHeroData";
import { Link } from "react-router-dom";
import { useState } from "react";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };
  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const { isLoading, data, isError, error, refetch, isFetching } =
    useSuperHeroData(onSuccess, onError);

  const { mutate } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    mutate(hero);
  };

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>

      <div>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <Button primary onClick={handleAddHeroClick}>
          Add Hero
        </Button>
      </div>

      <Button primary onClick={refetch}>
        Fetch data
      </Button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name} </Link>
          </div>
        );
      })}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};

// const fetchSuperHeroes = () => {
//   return axios.get("http://localhost:4000/superheroes");
// };

// const { isLoading, data, isError, error, refetch, isFetching } = useQuery(
//   "super-heroes",
//   fetchSuperHeroes,
//   {
//     // cacheTime: 5000, // cache value 5s. // default value 5 minute
//     // staleTime: 30000, // before 30s no fetching request will accepted if data updated after 30s fetching will take a fetching request // default time 0s
//     // refetchOnMount: true,  // data will fetch when you go this component
//     // refetchOnWindowFocus: false,

//     // refetchInterval: 2000, // In Every 2 second data will fetch
//     // refetchIntervalInBackground: true,

//     // ************************
//     // enabled: false,

//     onSuccess,
//     onError,
//     // select: (data) => {
//     //   const superHeroNames = data.data.map((hero) => hero.name);
//     //   return superHeroNames;
//     // },
//   }
// );
