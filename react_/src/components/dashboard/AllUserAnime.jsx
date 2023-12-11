import axiosClient from "../../clients/axios-client";
import UserAnimeGrid from "./UserAnimeGrid";
import Loading from "../Loading";
import { useQuery } from "react-query";
import NothingFound from "../NothingFound";
import ErrorComponent from "../../views/ErrorComponent";

const getUserAnime = async () => {
    const response = await axiosClient.get(`/anime`);
    return response.data;
};

function AllUserAnime() {
    const queryKey = "user_animes";
    const { data, isLoading, isError } = useQuery(queryKey, getUserAnime);

    if (isLoading) return <Loading />;

    if (isError) return <ErrorComponent />;

    return (
        <div className="">
            {Array.isArray(data) && data.length == 0 ? (
                <NothingFound />
            ) : (
                Object.keys(data).map((list, index) => {
                    const animes = data[list];
                    return (
                        <UserAnimeGrid
                            key={index}
                            title={list}
                            animes={animes}
                            queryKey={queryKey}
                        />
                    );
                })
            )}
        </div>
    );
}

export default AllUserAnime;
