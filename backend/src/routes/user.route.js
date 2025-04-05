import { Router } from "express";

const router = Router();

router.get("/", (req, res) => { 
    res.auth.userId
    res.send("User route with GET method");
});

export default router;