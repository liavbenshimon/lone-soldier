import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    visibility: {
      type: String,
      enum: ["Soldier", "Contributor", "Municipality", "Organization"],
      default: "Soldier",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relaciona o post ao usuário
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL para uma imagem opcional
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now()
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Usuários que curtiram o post
      },
      
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Quem comentou
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Adiciona campos de "createdAt" e "updatedAt"
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
