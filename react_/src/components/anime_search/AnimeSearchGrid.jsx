import { useQuery } from "@apollo/client";
import apolloClient from "../../apollo-client";
import searchAnimeQuery from "../../queries/searchqlQueries";
import AnimeSearchCard from "./AnimeSearchCard";
import { useLocation } from "react-router-dom";
import Loading from "../Loading";
import NothingFound from "../NothingFound";
import Error from "../../views/Error";

function AnimeSearchGrid() {
    const location = useLocation();

    const queryParams = {};
    const urlSearchParams = new URLSearchParams(location.search);

    for (const [key, value] of urlSearchParams.entries()) {
        queryParams[key] = value;
    }

    const { data, loading, error } = useQuery(searchAnimeQuery, {
        client: apolloClient,
        variables: {
            page: 1,
            perPage: 30,
            ...queryParams,
        },
    });

    if (loading) return <Loading />;

    if (error) return <Error />;

    return (
        <div className="mb-10">
            <div className="flex flex-col items-center justify-center py-6">
                {data.Page.media.length == 0 && <NothingFound />}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:grid-cols-3 gap-4 md:grid-cols-1 gap-4 sm:grid-cols-1 gap-3">
                    {data.Page.media.map((anime) => {
                        return (
                            <AnimeSearchCard
                                key={anime.id}
                                id={anime.id}
                                image={anime.coverImage.large}
                                title={[
                                    anime.title.english,
                                    anime.title.romaji,
                                ]}
                                description={anime.description}
                                genres={anime.genres}
                                seasonYear={anime.seasonYear}
                                season={anime.season}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default AnimeSearchGrid;