import { useState, useEffect } from "react";

export type User = {
  id: string;
  username: string;
  roles?: string[];
  avatarUrl?: string;
} | null;

export function useAuth() {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, []);

  return { user };
}
