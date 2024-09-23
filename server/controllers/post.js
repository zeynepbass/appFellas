import Post  from '../models/post.js'
import mongoose from 'mongoose';


const getPosts=async (req,res)=>{

    try {
        const postMessage=await Post.find();
        res.status(200).json(postMessage)
     
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const CreatePost=async (req,res)=>{

    const post=req.body;

    const newPost=new Post({...post});
    try {

        await newPost.save();
        res.status(201).json(newPost)
        
    } catch (error) {
        res.status(409).json({message:error.message})
    }

}

  const Detail=async (req,res)=>{
    const {id}=req.params;

    try {
        const post=await Post.findById(id)

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}


export {
    getPosts,
    CreatePost,
    Detail

}