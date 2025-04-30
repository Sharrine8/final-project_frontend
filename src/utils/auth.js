export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "faketoken" });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        name: "fake user",
        email: "fake@example.com",
        _id: "681248a04e982e1d9bfdf0d7",
      },
    });
  });
};
