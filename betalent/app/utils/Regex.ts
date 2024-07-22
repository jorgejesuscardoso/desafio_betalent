
export const ValidateEmail = (email: string) => {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  return regexEmail.test(email)
}

export const ValidatePassword = (password: string) => {
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?/])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?/]{6,}$/;

  return regexPassword.test(password)
}