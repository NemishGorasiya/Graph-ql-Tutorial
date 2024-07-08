export const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const removeCookie = (name) => {
  setCookie(name, "", -1);
};

export const isAuthorized = () => {
  return !!getCookie("accessToken");
};

export const getNewToken = () => {
  // token will not expire , so we don't need to fetch new token
};
