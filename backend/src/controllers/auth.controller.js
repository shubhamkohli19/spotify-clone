import { User } from "../models/user.model.js";


export const authCallback = async (req, res) => {
    try{
        const {id, firstName, lastName, imageUrl} = req.body;
        const user = await User.findOne({ clerkID: id });
        if (!user) {
            const newUser = await User.create({
                fullName: `${firstName} ${lastName}`,
                imageUrl,
                clerkID: id,
            });
            return res.status(201).json(newUser);
        } else {
            return res.status(200).json(user);
        }
    }
    catch (error) {
        console.error("Error in callback route:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}