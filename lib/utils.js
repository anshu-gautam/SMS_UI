import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function saveAuthToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
}

function getAuthToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
}

function removeAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
}

function saveUser(user) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

function getUser() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user"));
  }
}

function removeUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}

function signOut() {
  removeAuthToken();
  removeUser();
  window.location.href = "/signIn";
}

function convertToInitials(str) {
  // Split the string into an array of words
  const words = str.trim().split(" ");

  // Get the first character of each word and join them
  const initials = words.map((word) => word.charAt(0).toUpperCase());

  // Join the initials into a single string
  return initials.join("");
}

const authHelpers = {
  saveAuthToken,
  getAuthToken,
  removeAuthToken,
  saveUser,
  getUser,
  removeUser,
  signOut,
};

export { authHelpers, convertToInitials };
