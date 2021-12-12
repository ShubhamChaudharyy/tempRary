import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function Breadcrumb() {
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
            <Link
            underline="hover"
            color="inherit"
            href="/"
            >
            Home
            </Link>
            <Typography color="text.primary">Dashboard</Typography>
        </Breadcrumbs>
        </div>
    )
}

export default Breadcrumb
