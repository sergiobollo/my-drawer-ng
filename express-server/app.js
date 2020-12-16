var express = require("express"), cors = require('cors');
var app = express();
app.use(express.json());
app.use(cors());
app.listen(3000,() => console.log("Server running on port 3000"));

var noticias = [
	"Literatura Paris","Futbol Barcelona", "Futbol Barranquilla",
	"Politica Montevideo", "Economia Santiago Chile", "Cocina Mexico DF",
	"Finanzas Nueva York"
	];
app.get("/get", (req, res, next) =>
	res.json(noticias.filter((c)=> c.toLowerCase().indexOf(req.query.q.toString().toLowerCase())> -1)));


var misFavoritos =[];
app.get("/favs",(req, res, next) => res.json(misFavoritos));
app.post("/favs", (req, res, next) => {
	console.log(req.body);
	const index = misFavoritos.indexOf(req.body.nuevo);
	if(index < 0) {
		misFavoritos.push(req.body.nuevo);
		console.log(misFavoritos);
		res.json(misFavoritos);
	}
})
app.put("/favs", (req, res, next) => {
	console.log(req.body);
	const index = misFavoritos.indexOf(req.body.borrar);
	console.log(index);
	const r = misFavoritos.splice(index, 1);
	console.log(r);
	res.json(r);
})