export const setToLocalStorage = (key, value) => {
  console.table([key, value]);
  localStorage.setItem(key, JSON.stringify(value));
};

export const getToLocalStorage = (key) => {
  console.log("get", key);
  const data = localStorage.getItem(key);
  const result = data ? JSON.parse(data) : null;
  return result;
};

export const removeToLocalStorage = (key) => {
  localStorage.removeItem(key);
};
