import { User } from "firebase/auth";
import React, { Dispatch, SetStateAction } from "react";

export const AuthContext = React.createContext<[User, Dispatch<SetStateAction<User>>]>([null, () => {}]);
