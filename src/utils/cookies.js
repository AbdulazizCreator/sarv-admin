import Cookie from "js-cookie";
const jwt_decode = require("jwt-decode");

export const deleteCookie = (name) => {
  Cookie.remove(name);
};

export const setCookie = (name, value) => {
  Cookie.set(name, value, { path: "/" });
};

const checkCookieAvailable = (name) => {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin === -1) {
    begin = dc.indexOf(prefix);
    if (begin !== 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end === -1) {
      end = dc.length;
    }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
};

const tokenExpireTime = (token) => {
  const decoded = jwt_decode(token);
  const tokenExpireTime = decoded.exp;

  const tokenAvailableTime =
    tokenExpireTime * 1000 - 5 * 3600 * 1000 - Date.now();

  return tokenAvailableTime > 0 ? true : false;
};

export const checkCookie = (name) => {
  const myCookie = checkCookieAvailable(name);

  try {
    /** this contant means if its a true token not expired */
    const isTokenExpired = tokenExpireTime(myCookie);
    if (!isTokenExpired) {
      deleteCookie(name);
    }
  } catch (error) {
    deleteCookie(name);
    return null;
  } finally {
    if (myCookie !== null && tokenExpireTime(myCookie)) {
      return true;
    } else {
      return null;
    }
  }
};

export const getCookie = (name) => {
  const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
};
