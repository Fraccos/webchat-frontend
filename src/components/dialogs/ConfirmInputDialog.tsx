import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Alert,
	TextField,
	DialogActions,
	Button,
} from "@mui/material";
import React, { Children, useState } from "react";

interface ConfirmInputDialogProps {
	title: string;
	showDialog: boolean;
	toggleShowDialog: () => void;
	onConfirmCallback: (value?: string) => void;
	textToConfirm: string;
	children?: React.ReactNode;
}

const ConfirmInputDialog: React.FC<ConfirmInputDialogProps> = ({
	title,
	showDialog,
	textToConfirm,
	children,
	onConfirmCallback,
	toggleShowDialog,
}) => {
	const [confirmInput, setConfirmInput] = useState("");

	const toggleDialog = () => {
		if (!showDialog) {
			setConfirmInput("");
		}
		toggleShowDialog();
	};
	const handleConfirmSubmit = (e: React.FormEvent<HTMLElement>) => {
		e.preventDefault();
	  if (confirmInput === textToConfirm) {
			onConfirmCallback(textToConfirm);
		}
	};
	return (
		<>
			<Dialog open={showDialog} onClose={() => toggleDialog()}>
				<DialogTitle>Rimuovi amicizia</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{children}
					</DialogContentText>
					<form onSubmit={(e) => handleConfirmSubmit(e)}>
						<TextField
							autoFocus
							margin="dense"
							label="confirm box"
							type="text"
							value={confirmInput}
							onChange={(e) => setConfirmInput(e.target.value)}
							fullWidth
							variant="standard"
						/>
						<input
							type="submit"
							style={{ visibility: "hidden" }}
						></input>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => toggleDialog()}>Annulla</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ConfirmInputDialog;
