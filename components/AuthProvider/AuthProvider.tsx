import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AuthContext } from "./context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "utils/firebase";
import PageLoading from "components/PageLoading";

interface IProps {}

const AuthProvider: React.FC<IProps> = (props) => {
  const { children } = props;
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [setUser, setLoading]);


  if (loading) return <PageLoading loading />;


  return <AuthContext.Provider value={[user, setUser]}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
