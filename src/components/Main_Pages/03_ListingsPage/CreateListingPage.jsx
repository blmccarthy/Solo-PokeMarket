

import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



function CreateListingPage() {

    return (
        <>
            <TextField
                id="outlined-required"
                label="Card Name"
                autoComplete="off"
                value={cardName}
                required
                fullWidth
            />
        </>
    )
}

export default CreateListingPage;