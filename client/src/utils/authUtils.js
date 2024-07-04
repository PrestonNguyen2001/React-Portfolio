// Function to save token in localStorage
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Function to get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};
