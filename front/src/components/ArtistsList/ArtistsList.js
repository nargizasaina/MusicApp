import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, Button, CardActionArea} from '@mui/material';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import musicImage from '../../assets/music.jpg';
import {apiUrl} from "../../config";
import './ArtistsList.css';

const ArtistsList = ({id, title, image, publish}) => {
    const user = useSelector(state => state.users.user);
    let artistImage = musicImage;

    if (image) {
        artistImage = apiUrl + '/' + image;
    }

    return (
        <Card sx={{ width: 250, margin: "10px" }} >
            <CardActionArea component={Link} to={'/albums?artist=' + id}>
                <CardMedia
                    component="img"
                    height="200"
                    image={artistImage}
                    alt="artist"
                />
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6" paddingLeft={1}>
                        {title}
                    </Typography>
                    {!publish &&
                        <Typography sx={{ fontSize: 12 }} variant="body2" color="text.secondary">
                            Unpublished!
                        </Typography>
                    }
                </Box>

            </CardActionArea>
            {user?.role === 'admin' &&
                <Box display="flex" justifyContent="space-around" sx={{background: 'lightGrey'}}>
                    <Button type="button" color='error'>Delete</Button>
                    <Button type="button" color='success'>Publish</Button>
                </Box>
            }
        </Card>
    );
};

export default ArtistsList;