const saveLocal = (k, value) => {
  window.localStorage.setItem(k, JSON.stringify(value));
};

const getLocal = (k) => {
  return JSON.parse(window.localStorage.getItem(k));
};

const pushLocal = (k, value) => {
  let localArray = JSON.parse(window.localStorage.getItem(k));
  if (localArray === null) localArray = [];
  localArray.push(value);
  window.localStorage.setItem(k, JSON.stringify(localArray));
};

const clearLocal = () => {
  window.localStorage.clear();
};

const saveSession = (k, value) => {
  window.sessionStorage.setItem(k, JSON.stringify(value));
};

const getSession = (k) => {
  return JSON.parse(window.sessionStorage.getItem(k));
};

const pushSession = (k, value) => {
  let sesArray = JSON.parse(window.sessionStorage.getItem(k));
  if (sesArray === null) sesArray = [];
  sesArray.push(value);
  window.sessionStorage.setItem(k, JSON.stringify(sesArray));
};

const clearSession = () => {
  window.sessionStorage.clear();
};

const login = (creds) => {
  let users = getLocal("users");
  for (const u of users) {
    if (u.email === creds.email && u.password === creds.password) {
      const profile = { name: u.name, email: u.email };
      saveSession("profile", profile);
      return profile;
    }
  }
  return null;
};

const logout = () => {
  window.sessionStorage.removeItem("profile");
};

const Storage = {
  saveLocal,
  getLocal,
  pushLocal,
  clearLocal,
  saveSession,
  getSession,
  pushSession,
  clearSession,
  login,
  logout,
};
export default Storage;
