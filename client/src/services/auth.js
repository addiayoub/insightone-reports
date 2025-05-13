// auth.js
const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  login: async (email, password) => {
    if (!API_URL) {
      throw new Error('API_URL is not defined in environment variables');
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return await response.json();
  },
};