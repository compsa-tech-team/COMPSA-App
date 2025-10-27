import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = "http://localhost:3000/authentication"; 

export async function login(email: string, password: string) {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });

    if (res.status === 200) {
      const { uuid, email, pin } = res.data.user;

      await SecureStore.setItemAsync("userData", JSON.stringify({
        uuid,
        email,
        pin,
        failedAttempts: 0
      }));

      return res.data;
    }
  } catch (err: any) {
    console.error("Login failed:", err.response?.data || err.message);
    throw err;
  }
}

export async function getStoredUser() {
  const userData = await SecureStore.getItemAsync("userData");
  return userData ? JSON.parse(userData) : null;
}

export async function clearStoredUser() {
  await SecureStore.deleteItemAsync("userData");
}
