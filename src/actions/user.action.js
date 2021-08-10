import authServices from "services/authService"

export const register = (data, history) => async () => {
  try {
    const res = await authServices.post("/api/user/register", data, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    console.log(res);
  } catch (error) {
    console.log(error)
  }
}