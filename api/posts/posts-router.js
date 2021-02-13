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
//working no issues
postsRouter.post("/api/posts", (req,res)=>{
	const newPost = {
		title: req.body.title,
		contents: req.body.contents,
	}
	if(!req.body.title && !req.body.contents){
		return res.status(400).json({
			message: "Please provide title and contents for the post"
		})
	}
	posts.insert(req.body)
		.then((post)=>{
			console.log(res)
			res.status(201).json({...newPost,
				id:post.id})
			})
		.catch(()=>{
			res.status(500).json({ message: "There was an error while saving the post to the database" })
			})
})
//Update existing post
//working, no issues
postsRouter.put("/api/posts/:id", (req,res)=>{

	if(!req.body.title && !req.body.contents){
		return res.status(400).json({
			message: "Please provide title and contents for the post" 
		})}

	posts.update(req.params.id, req.params.body)
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
				message: "The post information could not be modified"
			})
		})
})
//delete post by id
//working, no issues
postsRouter.delete("/api/posts/:id", (req,res)=>{
	// console.log(req.params.id)
	posts.remove(req.params.id)
		.then((post)=>{
			if(post){
				res.status(200).json({
					message: `Post ID: ${req.params.id} has been deleted`
					})
			}else{
				res.status(404).json({
					message: "The post with this ID does not exist"
				})
			}
		})
		.catch(()=>{
			res.status(500).json({
				message: `The post (${req.params.id}) could not be removed`
			})
		})
	})
//grab all comments by post ID
//works no issues
postsRouter.get("/api/posts/:postId/comments", (req,res)=>{
	posts.findPostComments(req.params.postId)
		.then(comment => {
			if(comment){
				res.status(200).json(comment)
			}else{
				res.status(404).json({
					message: `The post with that ID (${req.params.id}) does not exist`
				})
			}
		})
		.catch(()=>{
			res.status(500).json({
				message: "The comments information could not be retrieved"
			})
		})
})

module.exports = postsRouter;