import React, { useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { forgotPasswordRequest } from "../../RequestProvider";
import { usernameIsEmpty } from "../utils";

const theme = createTheme();

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();

    if (usernameIsEmpty(username)) return;

    try {
      const data = await forgotPasswordRequest(username);
      const msg = createUserMessage(data);
      setMessage(msg);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
    setUsername("");
  }

  function createUserMessage(data) {
    return data.length === 0
      ? "This user does not exist"
      : `Password: ${data.password}`;
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Entre your username
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username-forgot-password"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Recovery
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="body2">
                  <LinkRouter to="/">Sign In</LinkRouter>
                </Typography>
              </Grid>
            </Grid>
            {message !== null ? (
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Recovery password"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {message}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
