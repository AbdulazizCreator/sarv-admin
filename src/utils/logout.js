import { TOKEN } from "../const";
import { deleteCookie } from "../utils/cookies";

export const logout = () => {
    deleteCookie(TOKEN);
    window.location.href = "/";
  };