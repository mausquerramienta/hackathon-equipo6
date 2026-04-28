const productos = [
    // --- HOMBRE ---
    { id: 1, nombre: "Basketball Pro 1", genero: "hombre", categoria: "basquet", precio: 1599, img: "img/hombre/hombre1basqt.jpg" },
    { id: 2, nombre: "Running Speed 1", genero: "hombre", categoria: "running", precio: 1299, img: "img/hombre/hombre1correr.jpg" },
    { id: 3, nombre: "Soccer Elite 1", genero: "hombre", categoria: "futbol", precio: 1450, img: "img/hombre/hombre1fut.jpg" },
    { id: 4, nombre: "Basketball Pro 2", genero: "hombre", categoria: "basquet", precio: 1650, img: "img/hombre/hombre2basqt.jpg" },
    { id: 5, nombre: "Running Speed 2", genero: "hombre", categoria: "running", precio: 1350, img: "img/hombre/hombre2correr.jpg" },
    { id: 6, nombre: "Soccer Elite 2", genero: "hombre", categoria: "futbol", precio: 1400, img: "img/hombre/hombre2fut.jpg" },
    { id: 7, nombre: "Basketball Pro 3", genero: "hombre", categoria: "basquet", precio: 1700, img: "img/hombre/hombre3basqt.jpg" },
    { id: 8, nombre: "Running Speed 3", genero: "hombre", categoria: "running", precio: 1100, img: "img/hombre/hombre3correr.jpg" },
    { id: 9, nombre: "Soccer Elite 3", genero: "hombre", categoria: "futbol", precio: 1380, img: "img/hombre/hombre3fut.jpg" },
    { id: 10, nombre: "Basketball Pro 4", genero: "hombre", categoria: "basquet", precio: 1550, img: "img/hombre/hombre4basqt.jpg" },
    { id: 11, nombre: "Soccer Elite 4", genero: "hombre", categoria: "futbol", precio: 1250, img: "img/hombre/hombre4fut.jpg" },

    // --- MUJER ---
    { id: 12, nombre: "Adidas F50 Sparkfusion", genero: "mujer", categoria: "futbol", precio: 2199, img: "img/mujer/adidas f50 sparkfusion fulbol - JR4389.jpg" },
    { id: 13, nombre: "Adidas VL Court Casual", genero: "mujer", categoria: "casual", precio: 1350, img: "img/mujer/adidas vl court mujer casual- modelo ID8797.jpg" },
    { id: 14, nombre: "Puma Future 7", genero: "mujer", categoria: "futbol", precio: 1899, img: "img/mujer/fútbol puma future 7 - 107701.jpg" },
    { id: 15, nombre: "Nike Running Spark", genero: "mujer", categoria: "running", precio: 1600, img: "img/mujer/Nike running mujer - modelo HV8121.jpg" },
    { id: 16, nombre: "Puma Club Klassika", genero: "mujer", categoria: "casual", precio: 1200, img: "img/mujer/puma club klassika casual - modelo 400364.jpg" },
    { id: 17, nombre: "Puma Running Pure", genero: "mujer", categoria: "running", precio: 1450, img: "img/mujer/Puma running mujer - modelo 311141K.jpg" },
    { id: 18, nombre: "Puma Ultra Ultimate", genero: "mujer", categoria: "futbol", precio: 2400, img: "img/mujer/puma-ultra-ultimate fútbol - 107767-01.jpg" },
    { id: 19, nombre: "Tennis Adidas Classic", genero: "mujer", categoria: "casual", precio: 1100, img: "img/mujer/Tennis adidas mujer - modelo KJ6791.jpg" }
];

let generoActual = "hombre";
let carrito = [];

/* ------------------ MÁS VENDIDOS ------------------ */
function cargarMasVendidos(){
    let cont = document.getElementById("masVendidos");
    cont.innerHTML = "";

    productos.slice(0,3).forEach(p=>{
        cont.innerHTML += crearCard(p);
    });
}

/* ------------------ FILTROS ------------------ */
function cargarGenero(gen){
    generoActual = gen;
    cargarCategoria("running");
}

function cargarCategoria(cat){
    let cont = document.getElementById("listaProductos");
    cont.innerHTML = "";

    let filtrados = productos.filter(p =>
        p.genero === generoActual && p.categoria === cat
    );

    filtrados.forEach(p=>{
        cont.innerHTML += crearCard(p);
    });
}

/* ------------------ CREA LAS TARJETAS ------------------ */
function crearCard(p){
return `
<div class="col-md-4 mb-3">
    <div class="card">

        <img src="${p.img}" class="card-img-top">

        <div class="card-body">

            <h5>${p.nombre}</h5>
            <p class="text-success">$${p.precio}</p>

            <select id="talla-${p.id}" class="form-select mb-2">
                <option>26</option>
                <option>27</option>
                <option>28</option>
            </select>

            <button class="btn btn-primary w-100"
                onclick="agregarCarrito(${p.id})">
                Agregar
            </button>

        </div>
    </div>
</div>
`;
}

/* ------------------ CARRITO ------------------ */
function agregarCarrito(id){
    let talla = document.getElementById(`talla-${id}`).value;

    carrito.push({id, talla});

    mostrarToast("Producto agregado");

    renderCarrito();
}

function eliminar(index){
    carrito.splice(index,1);

    mostrarToast("Producto eliminado");

    renderCarrito();
}

function renderCarrito(){
    let lista = document.getElementById("itemsCarrito");
    let total = 0;

    lista.innerHTML = "";

    carrito.forEach((item,i)=>{
        let prod = productos.find(p=>p.id === item.id);
        total += prod.precio;

        lista.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">

            <div>
                <strong>${prod.nombre}</strong><br>
                <small>Talla: ${item.talla}</small><br>
                <span class="text-success">$${prod.precio}</span>
            </div>

            <button class="btn btn-sm btn-danger"
                onclick="eliminar(${i})">
                🗑
            </button>

        </li>`;
    });

    document.getElementById("totalCarrito").innerText = "$" + total;

    actualizarContador(); 
}

/* ------------------ TOGGLE ------------------ */
function toggleCarrito(){
    document.getElementById("carrito").classList.toggle("activo");
}

/* ------------------ CONTADOR ------------------ */
function actualizarContador(){
    document.getElementById("contadorCarrito").innerText = carrito.length;
}

/* ------------------ TOAST ------------------ */
function mostrarToast(msg){
    document.getElementById("toastMsg").innerText = msg;
    new bootstrap.Toast(document.getElementById("toast")).show();
}

/* ------------------ ESTILOS PESTAÑAS ------------------ */
function seleccionarPestaña(elemento, categoria) {
    const pestañas = document.querySelectorAll('#pills-categorias .nav-link');
    pestañas.forEach(tab => tab.classList.remove('active'));
    elemento.classList.add('active');
    if (typeof cargarCategoria === "function") {
        cargarCategoria(categoria);
    }
}

/* ------------------ INIT ------------------ */
cargarMasVendidos();
cargarCategoria("running");
renderCarrito();
actualizarContador();