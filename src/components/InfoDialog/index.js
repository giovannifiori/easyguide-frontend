import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

export default function InfoDialog(props) {
    return (
        <Dialog open={props.open}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                {props.text}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onNeutralButtonClick} >OK</Button>
            </DialogActions>
        </Dialog>
    );
}