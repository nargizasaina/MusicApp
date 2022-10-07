import React from 'react';
import {apiUrl} from "../../config";
import {Box, CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {Link} from "react-router-dom";

const AlbumsList = ({id, year, title, image, publish}) => {
    const albumImage = apiUrl + '/' + image;

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
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography paddingLeft={0.5}>
                        <i>Year of release: </i><b>{year}</b>
                    </Typography>
                    {!publish &&
                        <Typography sx={{ fontSize: 12 }} variant="body2" color="text.secondary">
                            Unpublished!
                        </Typography>
                    }
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default AlbumsList;