import { LANG } from "..";
import { Ru } from "./Ru";
import { Uz } from "./Uz";

export const changeLang = (lang) => {
  switch (lang) {
    case "uz":
      return Uz;
    case "ru":
      return Ru;
    default:
      return Uz;
  }
};

let lan = Uz;

if (localStorage.getItem(LANG)) {
  localStorage.setItem(LANG, localStorage.getItem(LANG));
  lan = changeLang(localStorage.getItem(LANG));
}

export default lan;
