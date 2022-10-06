import React from 'react';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {Box, Button, CardContent, Typography} from "@mui/material";
import {apiUrl} from "../../config";
import musicImage from '../../assets/music.jpg';

const AdminPageArtists = (props) => {
    let neededImage = musicImage;
    if (props.image) {
        neededImage = apiUrl + '/' + props.image;
    }

    return (
        <Card sx={{ display: 'flex' , marginY: '5px'}}>
            <CardMedia sx={{flexShrink: '0', width: 140}}
                component="img"
                alt="photo"
                height="140"
                image={neededImage}
            />
            <Box sx={{ display: 'flex', width: '80%', justifyContent: 'space-between', flexShrink: '0'}}>
                <CardContent sx={{width: '70%', flexShrink: '0'}}>
                    <Typography gutterBottom variant="h6" component="div">
                        Title: <b>{props.title}</b>
                    </Typography>
                    {props.description &&
                        <Typography sx={{ fontSize: 12 }} variant="body2" color="text.secondary">
                            {props.description}
                        </Typography>
                    }
                </CardContent>
                <div style={{width: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                    <div>
                        <Button size="small" color="error" onClick={() => props.onDelete(props.id)}>Delete</Button>
                    </div>
                    <div>
                        {!props.publish &&
                            <>
                                <Typography sx={{ fontSize: 12 }} variant="body2" color="text.secondary">
                                Unpublished!
                                </Typography>
                                <Button size="small" color="success" onClick={() => props.onPublish(props.id)}>Publish</Button>
                            </>
                            }
                    </div>
                </div>
            </Box>
        </Card>
    );
};

export default AdminPageArtists;