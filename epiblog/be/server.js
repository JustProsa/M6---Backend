// Installiamo le librerie che ci servono in be: express e mongoose
// npm i express mongoose

//Scriviamo le regole di un server base
const express = require("express");
const mongoose = require("mongoose"); // equivale all' import mongoose from 'mongoose' ma non in ES6
const logger = require("./middlewares/logger");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const cors = require("cors");

//Al nostro server serve una porta
const PORT = 5050; //solitamente è una porta libera non occupata dai file di sistema del pc (consigliata)

// Per usare tutti i metodi di express bisogna storarla in una variabile
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

//middleware
//permette di collegare il file associato a postsRoute ad app, così da poter scrivere in posts.js tutte le logiche a lui relative mantenendo un codice ordinato
app.use("/", postsRoute);
app.use("/", usersRoute);

mongoose.connect(
  "mongodb+srv://theroescode:6a9d0Ii16IXqNg87@happycluster.0r5fkx1.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
); //E' un metodo che accetta come primo parametro la stringa del nostro database, e come secondo parametro un oggetto con due valori standard DA SAPERE

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error during db connection"));
// .on è un metodo per gestire gli eventi associati a un determinato elemento, in questo caso un evento di errore
// Ogni volta che ci sarà un errore ci stamperà questa stringa

db.once("open", () => {
  console.log("database successfully connected");
});

// .once invece indica un evento da ascoltare una volta sola, in questo caso l'apertura del database

//Il nostro server ha quasi tutto, ma non sa dove restare in ascolto per eventuali chiamate dal client
app.listen(PORT, () => console.log(`Server up and running on PORT: ${PORT}`)); //Ogni volta che facciamo una modifica al nostro file (metto ON masiuscolo ad esempio) nel terminale non cambia nulla, ma bisognerà chiuderlo con Ctrl + C e poi farlo ripartire con node server.js

// Per mettere il server in modalita watch si installa npm i -D nodemon
// Nel file package.json, in scripts si sostituisce "test" con "dev", e la stringa con "nodemon server.js"
// In questo modo facendo partire da terminale npm run dev
// Per interromperlo basta un Ctrl + C

/////// ROUTES ///////

// attraverso la costante app (specificata sopra con: express(), noi abbiamo accesso diretto a tutti i metodi GET, POST, DELETE, PUT e PATCH
// app.get('/') -> ad esempio con questo metodo avremo accesso (faremo la chiamata get) a http://localhost:5050 (la porta scelta prima per il nostro db)
// app.get('/posts') -> adesso la chiamata la faremo ad http://localhost:5050/posts
// app.post()
// app.delete()
// ecc...

// Sostituito tramite il codice in cartella routes/posts
// app.get("/posts", (req, res) => {
//   res.send({
//     author: "Pietro Rosano",
//     job: "Dubber",
//   });
// });

// Nelle chiamate c'è sempre una request e una response come parametri di una callback
// In questo caso (DATO CHE IL BROWSER FA SOLO CHIAMATE GET) sto inviando (.send()) al browser l'oggetto specificato nel metodo, e se andrò all'indirizzo http://localhost:5050 lo vedrò stampato a schermo.
// SE cambio il path in "/posts" (a scelta ovviamente), dovrò andare in quel percorso sul browser per vedere i miei dati

// !!! VEDI FILE test.http

app.post("/posts/create", (req, res) => {
  // logica del post
});

app.delete("/posts/create", (req, res) => {
  // logica del delete
});

app.patch("/posts/create", (req, res) => {
  // logica del delete
});

app.put("/posts/create", (req, res) => {
  // logica del delete
});

// Se continuiamo in questa direzione ci troveremo con un file lunghissimo, per questo è bene dividere il lavoro in cartelle: VEDI /ROUTES/POSTS.js

//QUERY DI MONGO
// https://www.mongodb.com/docs/manual/reference/operator/query/

//La paginazione di un server è importantissima. Se abbiamo un blog con 1000000 di visitatori e 1000000 di post avremo un array di 1m di post quando faremo una find dei post. Questo è un suicidio.
// I dati devono essere fruibili, quindi su React i post devono arrivarci in array divisi in pagine.
// Si definisce una page-size (Es. max 20) e i post ci arriveranno divisi in pagine da massimo 20 post, poi potremo scorrere.

// In mongoDb per creare un sistema di paginazione si può usare Limit oppure Skip
// Il Limit "limita" il risultato a n items, decidi tu quante, se noi concateniamo ad una query (Es .find()) il Limit a 10 il massimo risultato sarà di 10 items.
// Lo Skip è usato per saltare un certo numero di documenti, perché se abbiamo diviso i nostri 10 array in 10 pagine da 1 post, lo skip ci dirà a seconda del valore e quando noi cambiamo pagina, quanti dati deve skippare. Se siamo a pag 1 non skippa nulla, se siamo a pagina 2 ne skippa 1 per farci visualizzare la pagina 2.
// Funzionano in combinazione con un metodo chiamato SORT, che fa semplicemente l'ordinamento crescente o decrescente in base ad una proprietà che decidiamo noi.

//sort({ title: 1, category: -1 });
// Accetta come parametro un oggetto, che contiene i campi base a cui ordinare e la rispettiva "direzione" (ascendente/discendente)
// I valori accettati per la direzione sono 1 e -1
// In questo esempio i post saranno ordinati per titolo crescente e per categoria decrescente
