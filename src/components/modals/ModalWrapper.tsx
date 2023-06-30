import { Box, Button, ButtonGroup, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import { User } from '../../types/User';


export interface ModalWrapperProps {
    open: boolean;
    toggleOpen: () => void;
    children?: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ open,toggleOpen , children}) => {
    
    const handleClose = () => {
        toggleOpen();
    }
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        maxHeight: '80vh',
        overflowY: 'scroll',
        transform: 'translate(-50%, -50%)',
        minHeight: '50vh',
        width: '50vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    {children}              
                </Box>
            </Modal>
        </>
    );
};

export default ModalWrapper;
