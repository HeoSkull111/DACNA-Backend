import bcrypt from "bcrypt";

import userRepository from "@user/repositories/user.repository";

import { LoginUserForm, RegisterUserForm } from "@user/models/user.model";

const registerUser = async (user: RegisterUserForm) => {
  //Check if user already exists
  const tempUser = await userRepository.findUserByEmail(user.email);

  if (tempUser) {
    throw new Error("User already exists");
  }

  // Else hash the password and add the user to the database
  const salt = await bcrypt.genSalt(10);

  const userDocument = {
    ...user,
  };

  userDocument.password = await bcrypt.hash(user.password, salt);

  const repositoryResult = await userRepository.addUser(userDocument);
  return repositoryResult.insertedId;
};

const loginUser = async (user: LoginUserForm) => {
  const tempUser = await userRepository.findUserByEmail(user.email);

  if (!tempUser) {
    throw new Error("User does not exist");
  }

  const isMatch = await bcrypt.compare(user.password, tempUser.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return tempUser._id;
};

export default {
  registerUser,
  loginUser,
};
