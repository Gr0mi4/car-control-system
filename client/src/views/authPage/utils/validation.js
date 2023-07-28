export function loginValidation(login) {
  if (!login) {
    return 'Login can\'t be empty';
  }
  return false;
}

export function passwordValidation(pass) {
  if (!pass) {
    return 'Password can\'t be empty';
  }
  if (pass.length < 6) {
    return 'Password should be at least 6 symbols';
  }
  return false;
}
