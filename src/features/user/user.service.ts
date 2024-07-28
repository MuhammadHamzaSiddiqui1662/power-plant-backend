import path from "path";
import fs from "fs";
import { CustomRequestHandler } from "../../types/common";
import { User } from "./user.entity";
import { extractRootDirPath } from "../../utils";
import { IP } from "../ip/ip.entity";
import { ReviewType } from "../../types/review";

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

export const getProfileDetails: CustomRequestHandler = async (req, res) => {
  try {
    const { userId } = req.user;
    const userIdToFetch = req.params.id;

    if (userId !== userIdToFetch) {
      return res
        .status(403)
        .json({ message: "You can only view your own profile details" });
    }
    const user = await User.find({ _id: userId });
    res.status(200).json(user);
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

export const addReview: CustomRequestHandler = async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from the token
    const { id: userIdToReview, reviewType } = req.params;
    const reviewData = req.body;

    if (
      ![
        ReviewType.ReviewsAsInvestor,
        ReviewType.ReviewsAsBorker,
        ReviewType.ReviewsAsInnovator,
      ].includes(reviewType as ReviewType)
    ) {
      return res.status(400).json({ message: "Invalid review type" });
    }

    // Validate the review data
    const newReview = {
      ...reviewData,
      userId: userId,
    };

    // Add the review to the appropriate array
    const user = await User.findById(userIdToReview);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user[reviewType as ReviewType].push(newReview);
    await user.save();

    return res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addCertificate: CustomRequestHandler = async (req, res) => {
  try {
    const userIdForCertificate = req.params.id;
    const { userId } = req.user;
    const { category } = req.body;

    if (userId !== userIdForCertificate) {
      return res
        .status(403)
        .json({ message: "You can only add your own certificates" });
    }

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newCertificate = {
      category,
      imageUrl: req.file ? `/assets/uploads/users/${req.file.filename}` : "",
    };

    user.certificates.push(newCertificate);
    await user.save();

    res.status(201).json({
      message: "Certificate added successfully",
      certificate: newCertificate,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCertificate: CustomRequestHandler = async (req, res) => {
  try {
    const { id: userIdForCertificate, certificateId } = req.params;
    const { userId } = req.user;

    if (userId !== userIdForCertificate) {
      return res
        .status(403)
        .json({ message: "You can only delete your own certificates" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const certificateIndex = user.certificates.findIndex(
      (cert) => cert._id?.toString() === certificateId
    );

    if (certificateIndex === -1) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    const certificate = user.certificates[certificateIndex];

    // Remove certificate from the array
    user.certificates.splice(certificateIndex, 1);
    await user.save();

    // Delete the certificate image file if it exists and is not a placeholder
    if (
      certificate.imageUrl &&
      certificate.imageUrl !== "/placeholder-avatar.png"
    ) {
      const imagePath = path.join(
        extractRootDirPath(__dirname),
        "assets",
        "uploads",
        "users",
        path.basename(certificate.imageUrl)
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.log(`File not found: ${imagePath}`);
      }
    }

    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
