export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getToLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  const result = data ? JSON.parse(data) : null;
  return result;
};

export const removeToLocalStorage = (key) => {
  localStorage.removeItem(key);
};
