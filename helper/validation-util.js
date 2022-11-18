export function signupValidation(email, password, name) {
  const validation =
    !email ||
    !password ||
    !name ||
    !email.includes("@") ||
    password.length < 4 ||
    typeof name !== "string" ||
    password.includes(".");

  return validation;
}

export function contactValidation(email, name, content) {
  const validation =
    !email ||
    !name ||
    !email.includes("@") ||
    typeof name !== "string" ||
    content.includes("/") ||
    content.includes("`") ||
    content.includes("{");

  return validation;
}
