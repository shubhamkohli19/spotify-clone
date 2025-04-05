import { clerkClient } from "@clerk/express";

export const protectRoute = (req, res, next) => {
    if(!req.auth.userId){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    next();
}

export const requireAdmin = async (req, res, next) => {
    try{
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
        if(!isAdmin){
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    }
    catch (error) { 
        console.error("Error in requireAdmin middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
    