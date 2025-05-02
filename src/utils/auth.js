export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "faketoken" });
  });
};

//User: 1. Register 2. Login with same info for best results
const user = JSON.parse(localStorage.getItem("user"));

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        name: user.name,
        email: email,
        _id: "681248a04e982e1d9bfdf0d7",
      },
    });
  });
};
