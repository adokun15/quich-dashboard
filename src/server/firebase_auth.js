//Login
//Signup
//Forgot Password
//VerifyMail
//GoogleLogin

import { auth } from "@/firebase/client-sdk";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createSessionCookies } from "./session/createSessionCookies";

export async function LoginEmailAndPassword({ email, password }) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    const tokenStr = await user.user.getIdToken(true);

    //Save to LocalStorage/Cookies
    const c = await createSessionCookies({ idToken: tokenStr });

    console.log(c);

    return {
      token: tokenStr,
      //  emailVerified: user.user?.emailVerified,
    };
  } catch (err) {
    if (err?.code?.includes("auth")) {
      let message = err.code.split("/")[1];
      throw new Error(message.split("-").join(" ")?.toUpperCase());
    } else if (err?.code?.includes("unavailable")) {
      throw new Error("Poor Internet Detected!");
    } else {
      throw new Error(err?.message || "Something went wrong. Try again later!");
    }
  }
}

export async function SignupEmailAndPassword({ email, password }) {
  try {
    if (!email || !password) throw new Error("Invalid Input credentials");

    const user = await createUserWithEmailAndPassword(auth, email, password);

    //Retrieve Token
    const token = await user.user.getIdToken(true);

    //Save to LocalStorage/Cookies
    await createSessionCookies({ idToken: token });

    /*
    const actionCode = {
      url: `${
        process.env. === "development"
          ? "http://localhost:3000/auth"
          : "https://spacebiz.vercel.app/auth"
      }/verifyEmail?email=${email}`,
      handleCodeInApp: false,
    };*/

    // await sendEmailVerification(user.user, actionCode);

    return { isSuccess: true };
  } catch (err) {
    if (err?.code?.includes("auth")) {
      let message = err.code.split("/")[1];
      throw new Error(message.split("-").join(" ")?.toUpperCase());
    } else if (err?.code?.includes("unavailable")) {
      throw new Error("Poor Internet Detected!");
    } else {
      throw new Error(err?.message || "Something went wrong. Try again later!");
    }
  }
}
