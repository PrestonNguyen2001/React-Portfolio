export const saveToken = (token) => {
  console.log("Saving token:", token); // Debugging line
  if (token) {
    document.cookie = `access_token=${token}; path=/; SameSite=None; Secure`;
    console.log("Token saved in cookie:", document.cookie); // Debugging line
  }
};

export const getAuthHeaders = () => {
  try {
    console.log("Document:", document);
    console.log("Document.cookie:", document.cookie);
    console.log("Cookies enabled:", navigator.cookieEnabled);
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];
    console.log("Retrieved token from cookie:", token); // Debugging line
    return {
      Authorization: token ? `Bearer ${token}` : undefined,
    };
  } catch (error) {
    console.error("Error retrieving token:", error);
    return {};
  }
};

export const getToken = () => {
  try {
    console.log("Document:", document);
    console.log("Document.cookie:", document.cookie);
    console.log("Cookies enabled:", navigator.cookieEnabled);
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];
    console.log("Retrieved token from cookie:", token); // Debugging line
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);
    const isExpired = decoded.exp * 1000 < Date.now();
    console.log("Token is expired:", isExpired);
    return isExpired;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export const getValidToken = () => {
  const token = getToken();
  console.log("Retrieved token for validation:", token); // Debugging line
  const validToken = !token || isTokenExpired(token) ? null : token;
  console.log("Valid token:", validToken); // Debugging line
  return validToken;
};
