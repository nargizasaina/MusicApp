import React from 'react';
import Card from "@mui/material/Card";
import {Button, CardContent, Typography} from "@mui/material";

const AdminPageTracks = (props) => {
    return (
        <Card sx={{display: 'flex', marginY: '5px', justifyContent: 'space-between'}}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Title: <b>{props.title}</b>
                </Typography>
                {props.album &&
                    <Typography sx={{fontSize: 16}} gutterBottom variant="h6" component="div">
                        Album title: <b>{props.album}</b>
                    </Typography>
                }
                <Typography variant="body2" color="text.secondary">
                    Length of track: {props.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Number of track: {props.number}
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
        </Card>
    );
};

export default AdminPageTracks;