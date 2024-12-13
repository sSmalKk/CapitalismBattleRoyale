import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL || "";
const token = localStorage.getItem("token") || process.env.JWT || "";

// Dentro de um componente, você chamaria o `useNavigate`
export const useFetchUserData = () => {
  const navigate = useNavigate();

  const fetchUserData = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/"); // Usando `navigate` aqui se houver erro
    }
  };

  return { fetchUserData, apiUrl, token };
};
