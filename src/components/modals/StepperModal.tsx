import React from 'react';
import ModalWrapper, { ModalWrapperProps } from './ModalWrapper';
import StepperTutorial from '../StepperTutorial';

interface StepperModalProps extends ModalWrapperProps {
}

const StepperModal: React.FC<StepperModalProps> = ({ open, toggleOpen }) => {
    return (
        <>
            <ModalWrapper open={open} toggleOpen={toggleOpen}>
                <StepperTutorial></StepperTutorial>
            </ModalWrapper>
        </>
    );
};

export default StepperModal;
