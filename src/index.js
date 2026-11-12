import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/router.js";
import connection from "./config/db.js";


dotenv.config(); //permite leer las variables de entorno del fichero .env

const PORT = 3000;

const app = express();

// Middlewares 
app.use(cors())
app.use(express.json()) // permite leer el body de los POST en json
app.use(express.urlencoded()) // permite leer el body de los POST en formularios

app.use(express.static("public"));

app.set("views","./src/views"); //configura el directorio de las vistas
app.set("view engine","ejs");   //configura ejs como motor de plantillas

app.use("/",router);

// //Pone el servidor en funcionamiento
// app.listen(PORT,()=>{
//     console.log(`Aplicación en marcha en http://localhost:${PORT}`);
// })

async function startServer() {
    const maxAttempts = 5;
    let attempts = maxAttempts;
    while (attempts) {
        try {
            await connection.authenticate();
            console.log("Conexión establecida con la base de datos");
            app.listen(PORT, () => {
                console.log("Aplicación en marcha")
            })
            break;
        } catch (error) {
            console.error(`Intento ${maxAttempts - attempts} No se ha podido conectar a la base de datos`, error);
        }
        attempts--;
        await new Promise((resolve,reject)=>setTimeout(()=>{resolve()},5000));
    }
    if(attempts === 0){
        console.error(`no se ha podido conectar a la base de datos en ${maxAttempts} intentos`);
        process.exit(1);
    }

}


startServer();
