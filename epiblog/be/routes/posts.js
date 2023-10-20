const express = require("express");
const verifyToken = require("../middlewares/verifyToken");

// possiamo dargli il nome che vogliamo
// lo rendi una rotta che può essere utilizzata nella tua pagina principale per richiamare immediatamente questo percorso http://localhost:5050/posts
const posts = express.Router();
const logger = require("../middlewares/logger");
const validatePost = require("../middlewares/validatePost");
// importiamo il modello dei posts
const PostModel = require("../models/post");
const multer = require("multer");
const cloudinary = require("cloudinary").v2; //importiamo cloudinary per poter postare files sul cloud
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
const crypto = require("crypto");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); // diamo a cloudinary le sue chiavi salvate in .env

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "happyfolder", //nome della cartella su cloudinary
    format: async (req, file) => "png", //formato del file
    public_id: (req, file) => file.name,
  },
});

// dopo aver importato multer usiamo .diskStorage per creare
const internalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    //posizione in cui salvare i file
    cb(null, "uploads");
  },
  // nome del file che verrà salvato, molto importante per evitare conflitto dei nomi. deve essere univoco a prescindere dal nome di partenza
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${crypto.randomUUID()}`; //crypto è una libreria di node che genera un id univoco automaticamente
    //Rcuperiamo da tutto solo l'estensione dello stesso file
    const fileExtension = file.originalname.split(".").pop();
    // eseguiamo la callback con il titolo completo
    cb(null, `${uniqueSuffix}.${fileExtension}`);
  },
});

const upload = multer({ storage: internalStorage });
const cloudUpload = multer({ storage: cloudStorage }); // gli diciamo che deve usare il cloudStorage identificato prima quando gli sarà passato il middleware clouUpload

// POST SUL CLOUD

posts.post(
  "/posts/cloudUpload",
  cloudUpload.single("cover"),
  async (req, res) => {
    try {
      res.status(200).json({ cover: req.file.path });
    } catch (error) {
      res
        .status(500)
        .send({ statusCode: 500, message: "Errore interno del server" });
    }
  }
);

// Ora multer è pronto a gestire la nostra rotta per l'invio dei file
// upload diventa un middleware per l'invio di file, da mettere nella chiamata post per i file.
// se avremo un input in un form <input type="file" name="img"/> in upload.single("img") passeremo il nome dell'input che passa il file
posts.post("/posts/upload", upload.single("cover"), async (req, res) => {
  // ci serve l'indirizzo del nostro server
  const url = `${req.protocol}://${req.get("host")}`; //genera solo l'url del nostro server in modo automatico nel caso in cui cambiasse col tempo

  try {
    const imgUrl = req.file.filename; //il nostro file sarà in req.file perché arriva dal frontend
    res.status(200).json({ cover: `${url}/uploads/${imgUrl}` });
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: "Errore interno del server" });
  }
});

posts.get("/posts", logger, verifyToken, async (req, res) => {
  // logica del get

  const { page = 1, pageSize = 3 } = req.query; // stabiliamo che ci saranno delle queries chiamate page e pageSize che hanno di default questi valori. La pagina iniziale sarà la 1 e il massimo di risultati per ogni pagina saranno 3.

  try {
    const posts = await PostModel.find()
      .populate("author")
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    // trova tutti gli oggetti che corrispondono al modello POstModel
    // Il limit definisce il massimo di elem. che può contenere una pagina a 3 in questo caso
    // lo skip indica che dall' ultima pagina (page -1) deve skippare 3 elementi (* pageSize)
    // Il populate (referencing) lega in questo caso l'author del post a ciò che gli abbiamo passato nel Model del post. Ossia author -> type: mongoose.Schema.Types.ObjectId, ref: "userModel"... ossia l'id di un autore preso dalla tabella degli user. Quando andiamo a creare un post, passandogli nel campo author l'id dell'user che crea il post, avremo nel database tutti i dettagli di quell' autore, quando farò la GET dei posts.

    const totalPosts = await PostModel.count();
    // Conteggio di quanti post abbiamo nella nostra tabella sul server

    res.status(200).send({
      statusCode: 200,
      currentPage: Number(page),
      totalPages: Math.ceil(totalPosts / pageSize), //.ceil restituisce un numero intero. Possiamo capire quante pagine abbiamo semplicemente dividendo il totale dei posts per il massimo di posts che può tenere una pagina
      totalPosts,
      posts,
    });
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: "Errore interno del server" });
  }
});

posts.get("/posts/byId/:id", async (req, res) => {
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

posts.get("/posts/bytitle", async (req, res) => {
  const { title } = req.query;
  try {
    const postByTitle = await PostModel.find({
      title: {
        $regex: title, //$regex è uno dei tanti comandi di mongoose che definisce cosa cercare
        $options: "i", //"i" in $options rende la ricerca case-insensitive
      },
    });

    res.status(200).send(postByTitle);
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: `Internal server error`, error });
  }
});

posts.get("posts/bydate/:date", async (req, res) => {
  const { date } = req.params;

  try {
    const getPostByDate = await PostModel.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  { $dayOfMonth: "$createdAt" },
                  { $dayOfMonth: new Date(date) },
                ],
              },
              {
                $eq: [{ $month: "$createdAt" }, { $month: new Date(date) }],
              },
              {
                $eq: [{ $year: "$createdAt" }, { $year: new Date(date) }],
              },
            ],
          },
        },
      },
    ]);

    res.status(200).send(getPostByDate);
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: `Internal server error`, error });
  }
});

posts.post("/posts/create", validatePost, async (req, res) => {
  // logica del post

  console.log(req.body);

  const newPost = new PostModel({
    // si crea una nuova classe dal modello PostModel
    title: req.body.title, // sarà uguale a ciò che avrà una proprietà title nel body, quindi nel nostro frontend metteremo una chiamata POST in cui nella sezione body inseriremo una proprietà title e da lì prenderà questo valore.
    category: req.body.category,
    cover: req.body.cover,
    price: Number(req.body.price),
    rate: Number(req.body.rate),
    author: req.body.author,
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
  // logica del delete
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
  // logica del patch

  // Quando facciamo una modifica ci servirà un ID per dire al database quale oggetto modificare

  const { postId } = req.params;

  //Chiediamo di cercare con .find() l'oggetto che ha _id: postId
  // const postExist = await PostModel.find({ _id: postId });
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
