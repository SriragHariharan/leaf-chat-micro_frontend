import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
// import useStore from "hostApp/GlobalStore";
import { LEAF_PROFILE_REFRESH_TOKEN_URL } from "../constants/constants";

/* Check if access token is expired */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    return dayjs.unix(decoded.exp).diff(dayjs()) < 1; // Token expired if diff < 1
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Treat as expired if decoding fails
  }
};

/* Refresh access token */
export const getValidAccessToken = async (accessToken, refreshToken, setAccessToken, setRefreshToken, logout): Promise<string | null | undefined> => {

  // If token is still valid, return it
  if (accessToken && !isTokenExpired(accessToken)) {
    return accessToken;
  }

  // Otherwise, refresh the token
  try {
    const response = await axios.post(LEAF_PROFILE_REFRESH_TOKEN_URL, { refreshToken });

    if (response.data?.data) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      return newAccessToken;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    window.alert("Session expired. Please log in again.");
    logout();
    return null;
  }
};
