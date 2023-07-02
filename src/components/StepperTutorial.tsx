import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, Paper, StepContent, styled } from '@mui/material';

const steps = [
  {
    label: 'Benvenuto!',
    description: `Benvenuto nella nostra web app, ecco un piccolo tutorial per capire le sue funzionalità.
                  Per prima cosa premi sul + in basso, potrai cercare nuovi amici,
                  inziare delle chat e creare dei gruppi. 
                  (Attenzione: i membri di un gruppo devono essere tuoi amici)`,
  },
  {
    label: 'Gestione delle amicizie',
    description: `Dal pulsante a destra della barra di ricerca puoi gestire le richieste di amicizia:
                  puoi vedere la tua lista di amici, accettare o rifiutare le richieste di amicizia e anche cercare nuovi amici`,
  },
  {
    label: 'Gestione delle chat',
    description: `Sulla sinistra troverai le chat inziate, premendoci potrai vedere i messaggi.
                  Una volta aperta la chat premendo sul nome dell'utente o del gruppo potrai vedere le sui informazioni.
                  Che aspetti? Inizia a chattare.`,
  },
];
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function StepperTutorial() {
  
  const [open, setOpen] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}>
        <Box sx={{ maxWidth: 400, padding:"10px" }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Hai finito! Adesso sei pronto ad utilizzare la nostra web app</Typography>
            <DialogActions>
              <Button autoFocus onClick={handleClose} sx={{ mt: 1, mr: 1 }}>
                Let's start
              </Button>
            </DialogActions>
          </Paper>
        )}
      </Box>
    </BootstrapDialog>
  );
}