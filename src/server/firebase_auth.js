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

export async function LoginEmailAndPassword({ email, password }) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    //if (!user.user?.emailVerified) {
    //  throw new Error("Email not Verified yet!");
    // }

    const tokenStr = await user.user.getIdToken(true);
    return {
      token: tokenStr,
      emailVerified: user.user?.emailVerified,
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

    /*
    await updateProfile(user.user, {
      displayName: ,
    });
*/

    //Retrieve Token
    const token = await user.user.getIdToken(true);

    /*
    const actionCode = {
      url: `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/auth"
          : "https://spacebiz.vercel.app/auth"
      }/verifyEmail?email=${email}`,
      handleCodeInApp: false,
    };
*/
    //Redirect to verify-email;

    // await sendEmailVerification(user.user, actionCode);

    return { token };
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
