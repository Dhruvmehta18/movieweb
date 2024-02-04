const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9!@#$%^&*.]{8,24}$/;

const validateEmail = (email = "") => {
  return emailRegex.test(email);
};
const checkPassword = (password = "") => {
  return passwordRegex.test(password);
};
export { validateEmail, checkPassword };
