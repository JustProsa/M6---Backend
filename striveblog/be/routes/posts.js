const express = require("express");
const posts = express.Router();
const logger = require("../middlewares/logger");

// importiamo il modello dei posts
const PostModel = require("../models/post");

posts.get("/posts", logger, async (req, res) => {
  // logica del get

  const { page = 1, pageSize = 3 } = req.query;

  try {
    const posts = await PostModel.find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const totalPosts = await PostModel.count();

    res.status(200).send({
      statusCode: 200,
      currentPage: Number(page),
      totalPages: Math.ceil(totalPosts / pageSize),
      totalPosts,
      posts,
    });
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: "Errore interno del server" });
  }
});

posts.get("/posts/byId/:id", logger, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "Post not found!" });
    }

    res
      .status(200)
      .send({ statusCode: 200, message: "That's your post!", post });
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: `Internal server error`, error });
  }
});

posts.post("/posts/create", async (req, res) => {
  // logica del post

  console.log(req.body);

  const newPost = new PostModel({
    // si crea una nuova classe dal modello PostModel
    title: req.body.title,
    category: req.body.category,
    cover: req.body.cover,
    readTime: {
      value: req.body.readTime.value,
      timeUnit: req.body.readTime.timeUnit,
    },
    author: { name: req.body.author.name, avatar: req.body.author.avatar },
  });

  try {
    const post = await newPost.save(); // Il metodo .save() va a scrivere direttamente nel database

    res.status(201).send({
      statusCode: 201,
      message: "Post saved successfully",
      payload: post,
    });
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: "Errore interno del server" });
  }
});

posts.delete("/posts/delete/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostModel.findByIdAndDelete(postId);

    if (!post) {
      res.status(404).send({ statusCode: 404, message: "Post not FOUND" });
    }

    res
      .status(200)
      .send({ statusCode: 200, message: "Post deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: "Errore interno del server" });
  }
});

posts.patch("/posts/update/:postId", async (req, res) => {
  const { postId } = req.params;

  const postExist = await PostModel.findById(postId);

  if (!postExist) {
    return res.status(404).send({ statusCode: 404, message: "NOT FOUND!" });
  }

  try {
    const dataToUpdate = req.body;
    const options = { new: true };
    const result = await PostModel.findByIdAndUpdate(
      postId,
      dataToUpdate,
      options
    );

    res
      .status(200)
      .send({ statusCode: 200, message: "Post edited succesfully", result });
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: "Errore interno del server" });
  }
});

//esportiamo il modulo
module.exports = posts;
