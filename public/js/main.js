const socket = io.connect();


socket.on("messages", (data) =>{
    renderMessage(data);
})

const renderMessage = (data) =>{
    const html = data.map((elem) => {
        return `<div>
                    <strong style='color: blue'>${elem.email}</strong>:  
                    <em style='color: green'>${elem.mensaje}</em></div>
        `;
    }).join(" ");
    document.getElementById("mensajes").innerHTML = html
}

const addMessage = (e) =>{
    const mensaje = {
        email: document.getElementById('username').value,
        mensaje: document.getElementById('texto').value
    };

    socket.emit('new-message', mensaje);
    return false;
}

socket.on('products', (data) =>{
    renderProducts(data);
})

const renderProducts = (data) => {
    if(productos != undefined) {
        return document.getElementById('tabla').innerHTML = `<div class="table-responsive">
        <table class="table table-dark">
            <tr> 
                <th>Nombre</th> 
                <th>Precio</th> 
                <th>Foto</th>
            </tr>
            ${data.map(producto => {
                return document.querySelector('tr').innerHTML = `
                    <tr>
                        <td>${producto.title}</td>
                        <td>${producto.price}</td>
                        <td>
                            <img width="50" src= ${producto.thumbnail} alt="not found"></img>
                        </td>
                    </tr>
                `
            })}
        </table>
    </div>`
    } else {
        return document.getElementById('tabla').innerHTML = `<h3 class = "alert alert-warning" > No se encontraron productos </h3>`
    }
}


const addProduct = (e) =>{
    const newProduct = {
        "title": "document.getElementById('nombre').value",
        "price": "document.getElementById('precio').value",
        "thumbnail": "document.getElementById('foto').value",
    };

    socket.emit('new-product', newProduct);
}
    


