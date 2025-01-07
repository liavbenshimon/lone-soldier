import Post from "../models/postModel.js";
import User from "../models/userModel.js";

// Criar um novo post
export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    const post = new Post({
      author: req.user.id, // ID do usuário autenticado
      content,
      image,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post", error });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const { visibility } = req.query; 
    const filter = visibility ? { visibility } : {};
    
    const posts = await Post.find(filter)
      .populate("author", "firstName lastName profileImage nickname")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts", error });
  }
};


// Obter um post por ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "firstName lastName profileImage nickname"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Error fetching post", error });
  }
};

// Curtir um post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "Already liked this post" });
    }

    post.likes.push(req.user.id);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Error liking post", error });
  }
};

// Adicionar um comentário a um post
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
      user: req.user.id,
      text,
    };

    post.comments.push(comment);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};
