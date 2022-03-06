import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "utils/firebase";
import { ILoginRequest, IRegisterRequest } from "./typing";

const authService = {
  signIn: async (req: ILoginRequest) => {
    const { email, password } = req;
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  },

  signUp: async (req: IRegisterRequest) => {
    const { email, password } = req;
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  },

  signOut: () => signOut(auth)
};

export default authService;
