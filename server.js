const express = require("express");

const Productos = require("./api/productos.js");
const productos = new Productos();



const app = express();
app.use(express.static("./public"));

const { Server: IOServer } = require("socket.io");
const {	Server: HttpServer } = require("http");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use("/", (req, res) => {
	res.sendFile("index.html");
});


const messages = [
	{
		email: "Juan@gmail.com",
		mensaje: "Hola que tal",
	},
	{
		email: "Maria@gmail.com",
		mensaje: "Bien y vos?",
	},
	{
		email: "Juan@gmail.com",
		mensaje: "Me alegra",
	},
];

io.on("connection", (socket) => {
	console.log("se conecto un usuario");

	socket.emit("messages", messages);

	socket.on("new-message", (data) => {
		messages.push(data);
		io.sockets.emit("messages", messages);
	});
	

	socket.emit("products", productos.getAll())

	socket.on("new-product", (data) => {
		productos.save(data);
		io.sockets.emit("products", productos.getAll());
	})

});

httpServer.listen(8080, () => console.log("servidor Levantado"));