import bcrypt from "bcrypt";

import userRepository from "@user/repositories/user.repository";
import userProfileRepository from "@user/repositories/user_profile.repository";

import { IsOwner } from "@group/repositories/group_member.repository";

import {
  FullUser,
  LoginUserForm,
  RegisterUserForm,
  UpdateUserForm,
  User,
  UserProfile,
} from "@user/models/user.model";

const getUser = async (id: string): Promise<FullUser> => {
  const user = await userRepository.findUser(id);
  const userProfile = await userProfileRepository.findUserProfile(id);

  if (!user) {
    throw new Error("User not found");
  }

  if (!userProfile) {
    throw new Error("User profile not found");
  }

  return {
    id: user._id.toHexString(),
    username: user.username,
    email: user.email,
    photo_url: user.photo_url,

    first_name: userProfile.first_name,
    last_name: userProfile.last_name,
    phone: userProfile.phone,
  };
};

const updateUser = async (id: string, user: UpdateUserForm): Promise<FullUser> => {
  //Check if user exists
  const tempUser = await userRepository.findUser(id);

  if (!tempUser) {
    throw new Error("User not found");
  }

  // If update email or username, check if it is already taken
  if (user.email) {
    const isUserExistByEmail = await userRepository.findUserByEmail(user.email);

    if (isUserExistByEmail && isUserExistByEmail._id.toHexString() !== id) {
      throw new Error("This email is already registered");
    }
  }

  if (user.username) {
    const isUserExistByUsername = await userRepository.findUserByUsername(user.username);

    if (isUserExistByUsername && isUserExistByUsername._id.toHexString() !== id) {
      throw new Error("This username is already taken");
    }
  }

  // Update user in database
  const userDocument: Omit<User, "id"> = {
    username: user.username || tempUser.username,
    email: user.email || tempUser.email,
    password: tempUser.password,
    photo_url: tempUser.photo_url,
  };

  const repositoryResult = await userRepository.updateUser(id, userDocument);

  if (!repositoryResult) {
    throw new Error("Error updating user in database");
  }

  // Update user profile in database
  const tempUserProfile = await userProfileRepository.findUserProfile(id);

  if (!tempUserProfile) {
    throw new Error("User profile not found");
  }

  const userProfileForm: Omit<UserProfile, "id"> = {
    user_id: id,
    first_name: user.first_name || tempUserProfile.first_name,
    last_name: user.last_name || tempUserProfile.last_name,
    phone: user.phone || tempUserProfile.phone || "",
  };

  const userProfileResult = await userProfileRepository.updateUserProfile(id, userProfileForm);

  if (!userProfileResult) {
    throw new Error("Error updating user profile in database");
  }

  // Return updated user
  return {
    id: id,
    username: user.username || tempUser.username,
    email: user.email || tempUser.email,
    photo_url: tempUser.photo_url || "",

    first_name: user.first_name || tempUserProfile.first_name,
    last_name: user.last_name || tempUserProfile.last_name,
    phone: user.phone || "",
  };
};

const searchUser = async (
  user_id: string,
  group_id: string,
  query: string,
  excludes: string[]
): Promise<Omit<User, "password">[]> => {
  if (!query) {
    return [];
  }

  const isOwner = await IsOwner(group_id, user_id);

  if (!isOwner) {
    throw new Error("User is not the owner of the group");
  }

  const users = await userRepository.searchUser(query, [user_id, ...excludes]);

  if (!users) {
    throw new Error("No user found");
  }

  return users.map((user: any) => ({
    id: user._id.toHexString(),
    username: user.username,
    email: user.email,
    photo_url: user.photo_url,
  }));
};

const registerUser = async (user: RegisterUserForm): Promise<Omit<User, "password">> => {
  //Check if user already exists
  const isUserExistByEmail = await userRepository.findUserByEmail(user.email);

  if (isUserExistByEmail) {
    throw new Error("This email is already registered");
  }

  const isUserExistByUsername = await userRepository.findUserByUsername(
    user.username.toLowerCase()
  );

  if (isUserExistByUsername) {
    throw new Error("This username is already taken");
  }

  // Else hash the password and add the user to the database
  const salt = await bcrypt.genSalt(10);

  const userDocument: Omit<User, "id"> = {
    username: user.username.toLowerCase(),
    email: user.email,
    password: "",
    photo_url: user.photo_url || "",
  };

  userDocument.password = await bcrypt.hash(user.password, salt);

  const repositoryResult = await userRepository.addUser(userDocument);

  if (!repositoryResult) {
    throw new Error("Error adding user to database");
  }

  const userProfileForm: Omit<UserProfile, "id"> = {
    user_id: repositoryResult.insertedId.toHexString(),
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone || "",
  };

  const userProfileResult = await userProfileRepository.addUserProfile(userProfileForm);

  if (!userProfileResult) {
    throw new Error("Error adding user profile to database");
  }

  return {
    id: repositoryResult.insertedId.toHexString(),
    username: user.username.toLowerCase(),
    email: user.email,
    photo_url: user.photo_url || "",
  };
};

const loginUser = async (user: LoginUserForm): Promise<Omit<User, "password">> => {
  const tempUser = await userRepository.findUserByUsername(user.username.toLowerCase());

  if (!tempUser) {
    throw new Error("This username does not exist");
  }

  const isMatch = await bcrypt.compare(user.password, tempUser.password);

  if (!isMatch) {
    throw new Error("Invalid credentials. Incorrect password");
  }

  return {
    id: tempUser._id.toHexString(),
    username: tempUser.username.toLowerCase(),
    email: tempUser.email,
    photo_url: tempUser.photo_url,
  };
};

export default {
  getUser,
  updateUser,
  searchUser,
  registerUser,
  loginUser,
};
