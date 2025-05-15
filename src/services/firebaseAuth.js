import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "./firebase"; // Firebase initialization

// 🔎 Check if a username is already taken
const isUsernameTaken = async (fullName) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("fullName", "==", fullName));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

//  Register a new user
export const registerUser = async (fullName, email, password) => {
  try {
    if (await isUsernameTaken(fullName)) {
      throw new Error("🛑 Username is already taken. Please choose another.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Refresh the ID token to ensure auth is available to Firestore
    await user.getIdToken(true);

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      fullName,
      email,
      createdAt: serverTimestamp(),
    });

    await updateProfile(user, { displayName: fullName });

    return user;
  } catch (error) {
    console.error("🔥 Error signing up:", error.message);
    throw new Error(error.message);
  }
};

//  Login via email and password
export const loginUserWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("🔥 Error logging in with email:", error.message);
    throw new Error("Invalid email or password.");
  }
};

// Login via username (mapped to email)
export const loginUserWithUsername = async (fullName, password) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("fullName", "==", fullName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Username not found.");
    }

    const userData = querySnapshot.docs[0].data();
    const email = userData.email;

    return await loginUserWithEmail(email, password);
  } catch (error) {
    console.error("🔥 Error logging in with username:", error.message);
    throw new Error("Invalid username or password.");
  }
};

// Log out the current user
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("🔥 Error signing out:", error.message);
    throw new Error("Logout failed. Please try again.");
  }
};

// Google sign-in
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        fullName: user.displayName || user.email.split("@")[0],
        email: user.email,
        profilePic: user.photoURL || "",
        authProvider: "google",
        createdAt: serverTimestamp(),
      });
    }

    return user;
  } catch (error) {
    console.error("🔥 Error with Google sign-in:", error.message);
    throw new Error("Google sign-in failed. Please try again.");
  }
};

// Facebook sign-in
export const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        fullName: user.displayName || user.email.split("@")[0],
        email: user.email,
        profilePic: user.photoURL || "",
        authProvider: "facebook",
        createdAt: serverTimestamp(),
      });
    }

    return user;
  } catch (error) {
    console.error("🔥 Error with Facebook sign-in:", error.message);
    throw new Error("Facebook sign-in failed. Please try again.");
  }
};
