import React, { useState, useEffect } from "react";

interface User {
  username: string;
  role: string;
  email: string;
  userType: number;
  isActive: boolean;
}

interface UserProfileProps {
  token: string;
  mode: "admin" | "client";
  onUserFetched: (user: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ token, mode, onUserFetched }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const serverUrl = localStorage.getItem("server");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Define the endpoint based on user mode
        const endpoint = mode === "admin" ? "/device/api/v1/user/me" : "/device/api/v1/user/me";
        const response = await fetch(`${serverUrl}${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(token)
        // If the response is not ok, try the other endpoint
        if (!response.ok) {
          console.warn("First fetch failed, trying the other endpoint...");
          const fallbackEndpoint = mode === "admin" ? "/device/api/v1/user/me" : "/device/api/v1/user/me";
          const fallbackResponse = await fetch(`${serverUrl}${fallbackEndpoint}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!fallbackResponse.ok) {
            throw new Error("Failed to fetch user profile from fallback endpoint");
          }

          const fallbackData = await fallbackResponse.json();
          const user: User = {
            username: fallbackData.data.username,
            role: fallbackData.data.role || (fallbackData.data.userType === 2 ? 'admin' : 'user'),
            email: fallbackData.data.email,
            userType: fallbackData.data.userType,
            isActive: fallbackData.data.isActive,
          };

          onUserFetched(user);
        } else {
          const data = await response.json();
          const user: User = {
            username: data.data.username,
            role: data.data.role || (data.data.userType === 2 ? 'admin' : 'user'),
            email: data.data.email,
            userType: data.data.userType,
            isActive: data.data.isActive,
          };

          onUserFetched(user);
        }

        setLoading(false);
      } catch (error) {
        setError("Error fetching user profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [mode, token, serverUrl, onUserFetched]);

  if (loading) {
    return <p>Loading user profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return null; // Não renderiza nada, pois o perfil já foi passado para o componente pai
};

export { UserProfile };
