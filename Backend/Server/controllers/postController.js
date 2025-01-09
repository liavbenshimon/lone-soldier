import Post from "../models/postModel.js";

// Criar um novo post
export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    // Verifica se o conteúdo está vazio
    if (!content && !image) {
      return res.status(400).json({ message: "Content or image is required" });
    }

    const post = new Post({
      author: req.user._id, // ID do usuário autenticado via JWT
      content,
      image,
    });

    await post.save();

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
};

//Like
export const toggleLikePost = async (req, res) => {
  try {
    const { id } = req.params; 
    const { userId } = req.body; 

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const hasLiked = post.likes.some((like) => String(like) === String(userId));

    if (hasLiked) {
      // deslike
      post.likes = post.likes.filter((like) => String(like) !== String(userId));
    } else {
      // add like
      post.likes.push(userId);
    }

    await post.save();

    return res.status(200).json({ likes: post.likes.length, updatedLikes: post.likes });
  } catch (error) {
    console.error("Error toggling like:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// Obter todos os posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "firstName lastName profileImage nickname type") // Popula os campos do autor
      .sort({ createdAt: -1 }); // Ordena por mais recentes primeiro

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
};

// Obter um post por ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "firstName lastName profileImage nickname type"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Error fetching post", error: error.message });
  }
};

// Curtir um post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(req.user._id)) {
      return res.status(400).json({ message: "You have already liked this post" });
    }

    post.likes.push(req.user._id);
    await post.save();

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Error liking post", error: error.message });
  }
};

// Adicionar um comentário a um post
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
      user: req.user._id,
      text,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    res.status(200).json({ message: "Comment added successfully", post });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error: error.message });
  }
};
