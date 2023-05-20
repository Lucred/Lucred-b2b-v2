export default function ({ redirect, req, route }) {
  if (process.client) {
    const token = localStorage.getItem("b2b_token");
    console.log("token", token);
    if (!token) {
      return process.server
        ? redirect(`/login?redirect=${req?.originalUrl}`)
        : redirect(`/login?redirect=${route.fullPath}`)
    }
  }
}