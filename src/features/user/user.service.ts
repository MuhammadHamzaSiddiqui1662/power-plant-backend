import path from "path";
import fs from "fs";
import { CustomRequestHandler } from "../../types/common";
import { User } from "./user.entity";
import { extractRootDirPath } from "../../utils";
import { IP } from "../ip/ip.entity";

export const getAllUsers: CustomRequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser: CustomRequestHandler = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserById: CustomRequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser: CustomRequestHandler = async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from the token
    const userIdToUpdate = req.params.id;

    if (userId !== userIdToUpdate) {
      return res
        .status(403)
        .json({ message: "You can only update your own data" });
    }

    const updateData: any = { ...req.body };

    // Check if a file is provided
    if (req.file) {
      updateData.imageUrl = `/assets/uploads/users/${req.file.filename}`;

      // Find the user to get the current imageUrl
      const user = await User.findById(userIdToUpdate);
      if (
        user &&
        user.imageUrl &&
        user.imageUrl !== "/placeholder-avatar.png"
      ) {
        // Delete the previous image file
        const imagePath = path.join(
          extractRootDirPath(__dirname),
          "assets",
          "uploads",
          "users",
          path.basename(user.imageUrl)
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        } else {
          console.log(`File not found: ${imagePath}`);
        }
      }
    }

    const user = await User.findByIdAndUpdate(userIdToUpdate, updateData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser: CustomRequestHandler = async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from the token
    const userIdToDelete = req.params.id;

    if (userId !== userIdToDelete) {
      return res
        .status(403)
        .json({ message: "You can only delete your own data" });
    }

    const user = await User.findByIdAndDelete(userIdToDelete);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user's image file if it's not the default placeholder
    if (user.imageUrl && user.imageUrl !== "/placeholder-avatar.png") {
      const imagePath = path.join(
        extractRootDirPath(__dirname),
        "assets",
        "uploads",
        "users",
        path.basename(user.imageUrl)
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.log(`File not found: ${imagePath}`);
      }
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getIPs: CustomRequestHandler = async (req, res) => {
  try {
    const { _id } = req.user;
    const ips = await IP.find({ userId: _id });
    res.status(200).json(ips);
  } catch (error) {
    res.status(500).json(error);
  }
};
