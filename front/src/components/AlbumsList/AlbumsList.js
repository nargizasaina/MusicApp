import React from 'react';
import {apiUrl} from "../../config";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {Link} from "react-router-dom";

const AlbumsList = ({id, year, title, image}) => {
    const albumImage = apiUrl + '/uploads/' + image;

    return (
        <Card sx={{ width: 250, margin: "10px" }} >
            <CardActionArea component={Link} to={'/tracks?album=' + id}>
                <CardMedia
                    component="img"
                    height="200"
                    image={albumImage}
                    alt="album"
                />
                <Typography paddingLeft={0.5}>
                    <i>Title of album: </i><b>{title}</b>
                </Typography>
                <Typography paddingLeft={0.5}>
                    <i>Year of release: </i><b>{year}</b>
                </Typography>
            </CardActionArea>
        </Card>
    );
};

export default AlbumsList;