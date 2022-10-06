import React from 'react';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {Box, Button, CardContent, Typography} from "@mui/material";
import {apiUrl} from "../../config";

const AdminPageAlbums = (props) => {
    return (
        <Card sx={{ display: 'flex' , marginY: '5px'}}>
            <CardMedia sx={{flexShrink: '0', width: 140}}
                       component="img"
                       alt="photo"
                       height="140"
                       image={apiUrl + '/' + props.image}
            />
            <Box sx={{ display: 'flex', width: '80%', justifyContent: 'space-between', flexShrink: '0'}}>
                <CardContent sx={{width: '70%', flexShrink: '0'}}>
                    <Typography gutterBottom variant="h6" component="div">
                        Title: <b>{props.title}</b>
                    </Typography>
                    {props.artist &&
                        <Typography sx={{ fontSize: 16 }} gutterBottom variant="h6" component="div">
                            Artist title: <b>{props.artist}</b>
                        </Typography>
                    }
                    <Typography variant="body2" color="text.secondary">
                        Year of release: {props.year}
                    </Typography>
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

export default AdminPageAlbums;