import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  signInWithGoogle,
  signInWithFacebook,
} from "../../services/firebaseAuth";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

import { GoogleIcon, FacebookIcon } from "./customIcons";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles?.("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100dvh",
  overflowY: "auto",
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  ...theme.applyStyles?.("dark", {
    background:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SignUp(props) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [homeTown, setHomeTown] = React.useState("");

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const err = {};
    if (!firstName || !lastName || !email || !userName || !password) {
      err.form = "All required fields must be filled.";
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      err.email = "Please enter a valid email address.";
    }
    if (
      password &&
      (password.length < 6 ||
        !/\d/.test(password) ||
        !/[!@#$%^&*]/.test(password))
    ) {
      err.password =
        "Password must be 6+ chars, include a number and special char.";
    }
    if (birthDate && !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
      err.birthDate = "Use format YYYY-MM-DD.";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onHandleSignUp = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await registerUser({
        userName,
        email,
        password,
        firstName,
        lastName,
        birthDate: birthDate || null,
        homeTown: homeTown || null,
      });

      alert("✅ Success! Account created.");
      navigate("/login");
    } catch (error) {
      alert("❌ Signup Failed: " + error.message);
    }
  };

  return (
    <div {...props}>
      <CssBaseline enableColorScheme />

      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={onHandleSignUp}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <TextField
                fullWidth
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <TextField
                fullWidth
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField
                fullWidth
                required
                type="email"
                value={email}
                error={!!errors.email}
                helperText={errors.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Username</FormLabel>
              <TextField
                fullWidth
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <TextField
                fullWidth
                required
                type="password"
                value={password}
                error={!!errors.password}
                helperText={errors.password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Birthdate (YYYY-MM-DD)</FormLabel>
              <TextField
                fullWidth
                value={birthDate}
                error={!!errors.birthDate}
                helperText={errors.birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Hometown</FormLabel>
              <TextField
                fullWidth
                value={homeTown}
                onChange={(e) => setHomeTown(e.target.value)}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox />}
              label="I want to receive updates via email."
            />

            <Button type="submit" fullWidth variant="contained">
              Sign up
            </Button>
          </Box>

          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={signInWithGoogle}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={signInWithFacebook}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>

            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/login" variant="body2">
                Log in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </div>
  );
}
