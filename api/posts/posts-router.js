// implement your posts router here
const express = require('express');
const posts = require('./posts-model');

const postsRouter = express.Router();

//Grab all posts
//working, no issues
postsRouter.get("/api/posts", (req,res)=>{
	posts.find()
		.then((posts)=>{
			res.status(200).json(posts)
		})
		.catch(()=>{
			res.status(500).json({
				message:"The posts information could not be retrieved" 
			})
		})
})
//Grab 1 post by ID
//working, no issues
postsRouter.get("/api/posts/:id", (req,res)=>{
	posts.findById(req.params.id)
	.then((post)=>{
		if(post){
			res.status(200).json(post)
		}else{
			res.status(404).json({
				message: "The post with the specified ID does not exist"
			})
		}
	})
	.catch(()=>{
		res.status(500).json({
			 message: "The post information could not be retrieved" 
			})
	})

})
//Create new post
//
postsRouter.post("/api/posts", (req,res)=>{

})
//Update existing post
//
postsRouter.put("/api/posts/:id", (req,res)=>{

})
//delete post by id
//
postsRouter.delete("/api/posts/:id", (req,res)=>{

})
//grab all comments by post ID
//
postsRouter.get("/api/posts/:postID/comments", (req,res)=>{

})

module.exports = postsRouter;