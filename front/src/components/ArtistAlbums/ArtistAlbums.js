import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAlbums} from "../../store/actions/albumsActions";

const ArtistAlbums = ({match}) => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums.albums);

    useEffect(() => {
        dispatch(fetchAlbums(match.params.id));
    }, [dispatch]);

    console.log(albums);

    return (
        <div>
            
        </div>
    );
};

export default ArtistAlbums;