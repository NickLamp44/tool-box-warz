import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUserWithEmail,
  loginUserWithUsername,
  signInWithGoogle,
  signInWithFacebook,
} from "../../services/firebaseAuth";
import { getAuth, signInAnonymously } from "firebase/auth";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./forgotPassword";
import { GoogleIcon, FacebookIcon } from "./customIcons";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles?.("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles?.("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function Login(props) {
  const navigate = useNavigate();
  const [input, setInput] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [inputError, setInputError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const onHandleLogin = async (event) => {
    event.preventDefault();
    if (!input || !password) {
      setInputError(!input);
      setPasswordError(!password);
      return;
    }

    try {
      const isEmail = input.includes("@");
      if (isEmail) {
        await loginUserWithEmail(input, password);
      } else {
        await loginUserWithUsername(input, password);
      }
      console.log("✅ Login Successful");
      navigate("/home");
    } catch (error) {
      alert("❌ Login Failed: " + error.message);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      const auth = getAuth();
      const result = await signInAnonymously(auth);
      navigate("/home", { state: { userID: result.user.uid } });
    } catch (error) {
      alert("❌ Anonymous Login Failed: " + error.message);
    }
  };

  return (
    <div {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={onHandleLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email or Username</FormLabel>
              <TextField
                error={inputError}
                id="email"
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setInputError(false);
                }}
                placeholder="your@email.com / username"
                fullWidth
                required
                variant="outlined"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="••••••"
                fullWidth
                required
                variant="outlined"
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Remember me"
            />

            <ForgotPassword open={open} handleClose={() => setOpen(false)} />
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>

            <Link
              component="button"
              onClick={() => setOpen(true)}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Forgot your password?
            </Link>
          </Box>

          <Divider>or</Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={signInWithGoogle}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={signInWithFacebook}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
            <Button fullWidth variant="text" onClick={handleAnonymousLogin}>
              Continue as Guest
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link href="/signup" variant="body2">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </div>
  );
}
