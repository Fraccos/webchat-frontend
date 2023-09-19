import { Box, CircularProgress } from '@mui/material';
import React from 'react';

interface CenteredSpinnerProps {
}

const CenteredSpinner: React.FC<CenteredSpinnerProps> = ({  }) => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent:"center", alignContent: "center", height: "100%", width: "100%" }}>
                <CircularProgress />
            </Box>
        </>
    );
};

export default CenteredSpinner;
