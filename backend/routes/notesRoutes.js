import express from "express";

const router = express.Router();

router.get("/", (req,res)=>{
     res.status(200).send("Get notes successfully");  
});

router.post("/", (req,res)=>{
    res.status(201).send("Post created successfully");  
});

router.put("/:id", (req,res)=>{
    res.status(200).send("Post updated successfully");
});

router.delete("/:id", (req,res)=>{
    res.status(204).send("Post deleted successfully");
});

export default router;

