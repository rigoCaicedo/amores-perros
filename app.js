var express = require("express");
var app = express();

const pug = require("pug");

app.use(express.static(__dirname + "/public"));

var perros_array = [
    {raza: "Uther", texto:"Perro consentido", imagen: "uther.jpg"},
    {raza: "Dona", texto:"Perra Dona", imagen: "dona.jpg"},
    {raza: "Pepa", texto:"Perra pepita", imagen: "pepa.jpg"}
]

app.get("/",(req, res)=>{
    //res.send("index.html");
    res.render("index.pug",{
        titulo: "Mis bebes",
        texto: "Seleccione un perro",
        imagen: "perros.jfif",
        perros: perros_array
    });
});

app.get("/perro/:raza",(req, res)=>{
    
    var datosPerro = perros_array.filter((perro)=>{
        if(req.params.raza==perro.raza){
            return perro;
        }
    })[0];

    res.render("perro.pug",{
        raza: req.params.raza,
        data: datosPerro
    });
});

app.use((req,res)=>{
    res.status(400);

    let error = req.originalUrl;
    res.render("404.pug",{texto:error});
});

app.listen(3000,()=>{
    console.log("Servidor en el puerto 3000");
});