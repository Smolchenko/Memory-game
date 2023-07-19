import { playDataDefault } from "../constants";

export const getLocalStorageData = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data || playDataDefault;
  } catch (error) {
    console.error(`Error parsing local storage data for ${key}:`, error);
    return playDataDefault;
  }
};

export const getAttemptsFromLocalStorage = () => {
  return getLocalStorageData("playData")?.attempts || 0;
};

export const setLocalStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
