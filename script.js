let productos = JSON.parse(localStorage.getItem("productos")) || [];
let editandoIndex = -1;

mostrarProductos();

function guardarLocalStorage(){
    localStorage.setItem("productos", JSON.stringify(productos));
}

function agregarProducto(){

    const nombre = document.getElementById("nombre").value;
    const cantidad = document.getElementById("cantidad").value;
    const precio = document.getElementById("precio").value;

    if(nombre === "" || cantidad === "" || precio === ""){
        alert("Completa todos los campos");
        return;
    }

    const producto = {
        nombre,
        cantidad,
        precio
    };

    if(editandoIndex === -1){
        productos.push(producto);
    }else{
        productos[editandoIndex] = producto;
        editandoIndex = -1;
    }

    guardarLocalStorage();
    mostrarProductos();
    limpiarCampos();
}

function mostrarProductos(){

    const lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    productos.forEach((producto, index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
        ${producto.nombre} | Cantidad: ${producto.cantidad} | $${producto.precio}
        <br>
        <button onclick="editarProducto(${index})">Editar</button>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;

        lista.appendChild(li);
    });
}

function eliminarProducto(index){
    productos.splice(index,1);
    guardarLocalStorage();
    mostrarProductos();
}

function editarProducto(index){

    const producto = productos[index];

    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("cantidad").value = producto.cantidad;
    document.getElementById("precio").value = producto.precio;

    editandoIndex = index;
}

function limpiarCampos(){
    document.getElementById("nombre").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
}
