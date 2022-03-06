import { useAuth } from "components/AuthProvider/hooks";
import { User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import authService from "services/authService";
import { ILoginRequest, IRegisterRequest } from "services/typing";
import router, { useRouter } from "next/router";

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<User>(null);
  const router = useRouter();
  const signIn = useCallback(
    async (req: ILoginRequest) => {
      try {
        setLoading(true);
        setError(null);
        const user = await authService.signIn(req);
        setUser(user);
        router.replace("/");
        return user;
      } catch (error) {
        setError(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, router]
  );
  return [signIn, user, loading, error] as const;
};

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<User>(null);
  const router = useRouter();
  const register = useCallback(
    async (req: IRegisterRequest) => {
      try {
        setLoading(true);
        setError(null);
        const user = await authService.signUp(req);
        setUser(user);
        router.replace("/");
        return user;
      } catch (error) {
        setError(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, router]
  );
  return [register, user, loading, error] as const;
};

export const useSignOut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const router = useRouter();
  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await authService.signOut();
      router.replace("/sign-in");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, router]);
  return [signOut, loading, error] as const;
};

export const useRequireAuth = () => {
  const [user] = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/sign-in");
    }
  }, [user, router]);
};

export const useAlreadyAuth = () => {
  const [user] = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!!user) {
      router.replace("/");
    }
  }, [user, router]);
};
