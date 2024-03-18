import bcrypt from "bcrypt";

import userRepository from "@user/repositories/user.repository";

import { LoginUserForm, RegisterUserForm, User } from "@user/models/user.model";

const registerUser = async (user: RegisterUserForm): Promise<Omit<User, "password">> => {
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

  const repositoreResult = await userRepository.addUser(userDocument);

  if (!repositoreResult) {
    throw new Error("Error adding user to database");
  }

  return {
    id: repositoreResult.insertedId.toHexString(),
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  };
};

const loginUser = async (user: LoginUserForm): Promise<Omit<User, "password">> => {
  const tempUser = await userRepository.findUserByEmail(user.email);

  if (!tempUser) {
    throw new Error("User does not exist");
  }

  const isMatch = await bcrypt.compare(user.password, tempUser.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return {
    id: tempUser._id.toHexString(),
    email: tempUser.email,
    first_name: tempUser.first_name,
    last_name: tempUser.last_name,
  };
};

export default {
  registerUser,
  loginUser,
};
