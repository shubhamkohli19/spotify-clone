import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user.userId; // Assuming req.user is populated by the auth middleware
    const users = await User.find({clerkId: {$ne: currentUserId}}); // Exclude password and __v fields
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}