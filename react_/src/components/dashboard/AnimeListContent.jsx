import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";

function AnimeListContent() {
    const { list } = useParams();

    console.log(list);

    const getAnime = () => {
        axiosClient
            .get(`/anime/${list}`)
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(`Error in API : ${err}`);
            });
    };

    useEffect(() => {
        getAnime();
    }, []);

    return <div>WatchingTable</div>;
}

export default AnimeListContent;
