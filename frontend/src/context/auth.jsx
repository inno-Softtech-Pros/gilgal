// frontend/src/context/auth.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

const AuthContext = createContext(null);

const DEFAULT_USER = {
  userId: null,
  name: null,
  email: null,
  isAuthenticated: false
};

const readCachedUser = () => {
  try {
    return JSON.parse(localStorage.getItem("gag_user") || "null") || DEFAULT_USER;
  } catch {
    return DEFAULT_USER;
  }
};

export function AuthProvider({ children }) {
  const cachedUser = readCachedUser();
  const [user, setUser] = useState(cachedUser);
  const [isLoading, setIsLoading] = useState(!cachedUser?.isAuthenticated);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken?.toString();

        if (!idToken) {
          setUser(DEFAULT_USER);
          localStorage.removeItem("gag_user");
          return;
        }

        const payload = JSON.parse(atob(idToken.split(".")[1]));

        const userData = {
          userId: payload.sub || null,
          name: payload.name || null,
          email: payload.email || null,
          isAuthenticated: true
        };

        setUser(userData);
        localStorage.setItem("gag_user", JSON.stringify(userData));
      } catch (err) {
        const isAuthError =
          err?.name === "NotAuthorizedException" ||
          err?.name === "UserUnAuthenticatedException" ||
          err?.message?.includes("No current user");

        if (isAuthError) {
          setUser(DEFAULT_USER);
          localStorage.removeItem("gag_user");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signedIn") loadUser();
      if (payload.event === "signedOut") {
        setUser(DEFAULT_USER);
        localStorage.removeItem("gag_user");
      }
    });

    return () => unsubscribe();
  }, []);

  const clearUser = () => {
    setUser(DEFAULT_USER);
    localStorage.removeItem("gag_user");
  };

  return <AuthContext.Provider value={{ ...user, isLoading, clearUser }}>{children}</AuthContext.Provider>;
}

AuthProvider.useAuth = () => useContext(AuthContext);
