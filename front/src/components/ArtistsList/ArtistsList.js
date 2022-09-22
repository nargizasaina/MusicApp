import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {Link} from "react-router-dom";
import musicImage from '../../assets/music.jpg';
import {apiUrl} from "../../config";
import './ArtistsList.css';

const ArtistsList = ({id, title, image}) => {
    let artistImage = musicImage;

    if (image) {
        artistImage = apiUrl + '/uploads/' + image;
    }

    return (
        <Card sx={{ width: 250, margin: "10px" }} >
            <CardActionArea component={Link} to={'/albums/artist/' + id}>
                <CardMedia
                    component="img"
                    height="200"
                    image={artistImage}
                    alt="artist"
                />
                <Typography variant="h6" paddingLeft={1}>
                    {title}
                </Typography>
            </CardActionArea>
        </Card>
    );
};

export default ArtistsList;