const build = "dev";

export const API_URL = build === "prod" ? "" : "/server";

export const API_URL_ADMIN =
  build === "prod" ? "/api/admin/" : "/server" + "/api/admin/";

export const API_URL_ROOMS =
  build === "prod" ? "/api/room/" : "/server" + "/api/room/";

export const API_URL_USERS =
  build === "prod" ? "/api/users/" : "/server" + "/api/users/";

export const API_URL_RESERVE =
  build === "prod" ? "/api/reservation/" : "/server" + "/api/reservation/";

export const API_URL_REPORTS =
  build === "prod" ? "/api/reports/" : "/server" + "/api/reports/";
