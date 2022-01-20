import { TOKEN } from "../const";
import { deleteCookie } from "../utils/cookies";

export const logout = () => {
    deleteCookie(TOKEN);
    logout('/logout');
    window.location.href = "/";
  };