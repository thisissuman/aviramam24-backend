import validator from "validator";

export const validateSignupInput = (req) => {
  const { firstName, lastName, phoneNumber, email, password, age, gender } = req.body;
  
  if (!firstName) {
    throw new Error("First name is required");
  }
  
  if (!lastName) {
    throw new Error("Last name is required");
  }
  
  if (!phoneNumber) {
    throw new Error("Phone number is required");
  } else if (!validator.isMobilePhone(phoneNumber, 'any')) {
    throw new Error("Phone number is not valid");
  }
  
  if (!email) {
    throw new Error("Email is required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  
  if (!password) {
    throw new Error("Password is required");
  } 

  
  if (!gender) {
    throw new Error("Gender is required");
  } else if (!['male', 'female', 'other'].includes(gender.toLowerCase())) {
    throw new Error("Gender must be 'male', 'female', or 'other'");
  }
};