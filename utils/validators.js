module.exports.validateRegisterInput = (
  username,
  fullname,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (fullname.trim() === "") {
    errors.fullname = "Full name must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Username must not be empty";
  } else {
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.com$/;
    if (!email.match(regex)) {
      errors.email = "Invalid email";
    }
  }
  if (password === "") {
    errors.password = "Password required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password must match";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username must not be empty";
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
