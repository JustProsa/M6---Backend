// Un middleware è una funzione che accetta tre parametri (req, res, next) ===> next è una funzione che quando invocata in logger darà il via per poter andare avanti, e il server andrà avanti con il suo flusso di dati alla response.

const logger = (req, res, next) => {
  const { url, ip, method } = req; //sono metodi che possono essere utilizzati

  //   if (req.body.title !== "ciao") {
  //     return res.status(403).send({ statusCode: 403, message: "ma che fai?" });
  //   }

  console.log(
    `${new Date().toISOString()} Effettutata richiesta ${method} all' endpoint: ${url} all' IP: ${ip}`
  );

  next();
};

module.exports = logger;
//esportiamolo nella rotta dei posts
// i middlewares possono essere inseriti nelle funzioni GET, POST, PATCH ecc... tra il path e la funzione asincrona:

// posts.get("/posts", logger, async (req, res) => {})

// Per usare un middleware su tutte le rotte mi basterà inserirlo in server.js:
// app.use(logger)
