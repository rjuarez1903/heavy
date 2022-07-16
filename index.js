// Rodrigo Juarez

'use strict';

const d = document;

// Definición de los objetos 
let productos = [{id:1, nombre: 'Megadeth T-Shirt', precio: '2000', imagen:'megadeth.png', descripcion: 'Megadeth T-Shirt<br>Available in all sizes', categoria: 'T-SHIRTS'},
                 {id:2, nombre: 'Slipknot T-Shirt', precio: '2500', imagen:'slipknot.png', descripcion: 'Slipknot World Tour T-Shirt<br>Available in all sizes', categoria: 'T-SHIRTS'}, 
                 {id:3, nombre: 'Slipknot Tank Top', precio: '1800', imagen:'slipknot2.png', descripcion: 'Slipknot Tank Top Angry Lamb<br>Available in all sizes', categoria: 'TANK TOPS'},
                 {id:4, nombre: 'Devil Horns Hoodie', precio: '3800', imagen:'devilHorns.png', descripcion: 'Devil Horns Hoodie<br>Available in all sizes', categoria: 'HOODIES'},
                 {id:5, nombre: 'Motorhead Bottle Opener', precio: '500', imagen:'motorhead.png', descripcion: 'Motorhead Bottle Opeer featuring Snaggletooth', categoria: 'ACCESORIES'},
                 {id:6, nombre: 'Slipknot - .5: The Grey Chapter', precio: '3000', imagen:'slipknotVinyl.png', descripcion: '.5: Slipknot - The Grey Chapter Vinyl<br>180 gram vinyl', categoria: 'VINYLS'}]

let carrito = []

// Defino variables
let divProductos    = d.getElementById('merchContainer');
let divCarrito      = d.getElementById('carrito');
let carritoContador = d.getElementById('carritoCuenta');
let aviso           = d.getElementById('prodAgregar');

// Variables que contienen los items del dropdown menu
let all         = d.getElementById('allProducts');
let tShirts     = d.getElementById('tShirts');
let tankTops    = d.getElementById('tankTops');
let hoodies     = d.getElementById('hoodies');
let accesories  = d.getElementById('accesories');
let vinyls      = d.getElementById('vinyls');

let divRow       = d.createElement('div');
divRow.className = 'row';
divProductos.prepend(divRow);


for (let prod of productos) {
    // Armado de la estructura html para cada producto
    let divProd         = d.createElement('div')
    let divImg          = d.createElement('div');
    let img             = d.createElement('img');
    let h2              = d.createElement('h2');
    let p               = d.createElement('p');
    let p2              = d.createElement('p');
    let p3              = d.createElement('p');
    let button          = d.createElement('button');

    divProd.className   = 'producto col-sm-6 col-md-3 col-xl-2'
    divImg.className    = 'imagenProducto';
    h2.innerHTML        = prod.nombre;
    h2.className        = 'productoClase';
    img.src             = 'images/'+prod.imagen;
    p.innerHTML         = '<strong>$'+prod.precio+'</strong>';
    p.className         = 'red';
    p2.innerHTML        = prod.descripcion;
    p3.innerHTML        = prod.categoria;
    p3.style.fontStyle  = 'italic'
    button.innerHTML    = 'Add Product';
    button.type         = 'button';
    button.className    = 'mybuttonoverlap btn btn-danger';
    button.setAttribute('data-id', prod.id);
    button.setAttribute('data-nombre', prod.nombre);
    button.setAttribute('data-precio', prod.precio);
    button.setAttribute('data-imagen', prod.imagen);
    button.setAttribute('data-descripcion', prod.descripcion);
    button.setAttribute('data-categoria', prod.categoria);
   
    divRow.append(divProd);
    divProd.append(divImg);
    divImg.append(img) ;  
    divProd.append(h2);
    divProd.append(p);
    divProd.append(p2);
    divProd.append(p3);
    divProd.append(button);

    // El botón agrega productos al carrito y a su vez imprime en pantalla un aviso
    button.addEventListener('click', Agregar)
    button.addEventListener('click', function(){
        aviso.style.display = 'block';
    })

    // Filtrado de productos según categoría
    all.addEventListener('click', (e) => {
        divProd.style.display = 'flex';
        console.log('All products displayed')
    })   

    tShirts.addEventListener('click', (e) => {
        if (prod.categoria == 'T-SHIRTS'){
            divProd.style.display = 'flex';
            console.log(prod.categoria);
        } else {
            divProd.style.display = 'none';
        }
    })

    tankTops.addEventListener('click', (e) => {
        if (prod.categoria == 'TANK TOPS'){
            divProd.style.display = 'flex';
            console.log(prod.categoria);
        } else {
            divProd.style.display = 'none';
        }
    })

    hoodies.addEventListener('click', (e) => {
        if (prod.categoria == 'HOODIES'){
            divProd.style.display = 'flex';
            console.log(prod.categoria);
        } else {
            divProd.style.display = 'none';
        }
    })

    accesories.addEventListener('click', (e) => {
        if (prod.categoria == 'ACCESORIES'){
            divProd.style.display = 'flex';
            console.log(prod.categoria);
        } else {
            divProd.style.display = 'none';
        }
    })

    vinyls.addEventListener('click', (e) => {
        if (prod.categoria == 'VINYLS'){
            divProd.style.display = 'flex';
            console.log(prod.categoria);
        } else {
            divProd.style.display = 'none';
        }
    })
}

//Función para agregar productos al carrito
function Agregar (e) {

    // Obtengo los datos del producto
    let idProd          = e.target.dataset.id;
    let nombreProd      = e.target.dataset.nombre;
    let precioProd      = e.target.dataset.precio;
    let imagenProd      = e.target.dataset.imagen;
    let descripcionProd = e.target.dataset.descripcion;
    let categoriaProd   = e.target.dataset.categoria;
    let existe          = false;

    //Me fijo si existe información en localStorage
    if (localStorage.getItem('infoCarrito') != null) {
        carrito = JSON.parse(localStorage.getItem('infoCarrito'));
    }

    //Recorro todos los productos que tengo en el carrito
    for (let item of carrito)
        // Comparo cada id de producto en el carrito, con el id del producto que están agregando 
        if (item.id == idProd) {
            // Si existe, incremento su cantidad
            item.cantidad++;
            existe = true;
            console.log('Added');
    }

    //Si el producto no existe, lo agrego
    if (!existe) {
        //Creo un nuevo objeto producto
        let nuevoProd = {id: idProd, nombre: nombreProd, precio: precioProd, imagen: imagenProd, descripcion: descripcionProd, categoria: categoriaProd, cantidad: 1};

        // Agrego el objeto al carrito
        carrito.push(nuevoProd);
        console.log('Added');
    }

    // Luego de dos segundos el aviso de 'Item Added' desaparece
    setTimeout(function() {
        aviso.style.display = 'none';
    }, 2000)

    // Guardo carrito en localStorage
    localStorage.setItem('infoCarrito', JSON.stringify(carrito));

    console.log(carrito);
    Mostrar();
}  

// Función para mostrar los elementos agregados en el carrito
function Mostrar() {
    // Me fijo si existe información en localStorage
    if (localStorage.getItem('infoCarrito') != null) {
        carrito = JSON.parse(localStorage.getItem('infoCarrito'));
    }

    let ul           = d.createElement('ul'); 
    let divTotal     = d.createElement('div')
    let mostrarTotal = d.createElement('h2')
    let li; 
    let hr;
    let cantidad = 0;
    let total = 0;

    for (let item of carrito) {
        let divProd1       = d.createElement('div');
        li                 = d.createElement('li');

        // Creo un botón para eliminar productos
        let btnEliminar       = d.createElement('button');
        btnEliminar.innerHTML = ' - ';
        btnEliminar.setAttribute('data-id', item.id);
        btnEliminar.setAttribute('onclick', 'Eliminar('+item.id+');');
        btnEliminar.className = 'btn btn-outline-dark';

        //Creo un botón para agregar productos
        let btnAgregar = document.createElement('button');
        btnAgregar.innerHTML = ' + ';
        btnAgregar.setAttribute('data-id', item.id);
        btnAgregar.setAttribute('onclick', 'AgregarProd('+item.id+');'); 
        btnAgregar.className = 'btn btn-outline-dark';

        hr                   = d.createElement('hr');
        divProd1.innerHTML   = '<p class="h6" style="font-size: .9rem"><strong>'+item.nombre+'</strong></p><img src="images/'+item.imagen+'" class="imgCanvas"><p class="h6 ps-3" style="display: inline-block; font-size: 0.9rem">Price $'+item.precio+' - Amount: '+item.cantidad+'</p>';
        ul.append(li);
        li.append(divProd1);
        li.append(hr);
        divProd1.append(btnEliminar);
        divProd1.append(btnAgregar);
        li.setAttribute('data-id', item.id);
        divProd1.setAttribute('style', 'display: flex; justify-content: space-between; align-items: center;');
        divProd1.setAttribute('id', 'prodContainer');
        total += parseInt(item.precio)*(item.cantidad);
        cantidad += parseInt(item.cantidad);
    }   

    divCarrito.innerHTML      = '<p class="h6"><strong>Amount: </strong>'+cantidad+'</p>';
    divCarrito.append(ul)
    divCarrito.append(divTotal);
    divTotal.append(mostrarTotal);
    mostrarTotal.innerHTML    = '<p class="h6"><strong>Total: </strong>$'+total+'</p>';
    carritoContador.innerHTML = ' ('+cantidad+') - $'+total;

    //Agrego botón Vaciar carrito
    if (carrito.length > 0) {
        let vaciarCarrito           = d.createElement('button');
        vaciarCarrito.setAttribute  = ('type', 'button');
        vaciarCarrito.className     = 'btn btn-dark';
        vaciarCarrito.innerHTML     = 'Empty Cart'
        vaciarCarrito.addEventListener('click', Vaciar);
        divCarrito.append(vaciarCarrito);
    }

    console.log(total);
    console.log(carrito);
}

// Función para eliminar productos desde el carrito
function Eliminar(prodId) {
    for (let indice in carrito) {
        if (carrito[indice].id == prodId) {
            if (carrito[indice].cantidad > 1) {
                //Resta 1 a la cantidad
                carrito[indice].cantidad--;
                console.log('Deleted');
            } else {
                //Eliminar el producto
                carrito.splice(indice,1); 
            }
        }
    }

    // Guardo carrito en localStorage
    localStorage.setItem('infoCarrito', JSON.stringify(carrito));
    Mostrar();
}

// Función para agregar productos desde el carrito
function AgregarProd(prodId) {
    for (let indice in carrito) {
        if (carrito[indice].id == prodId) {
            // Suma 1 a la cantidad
            carrito[indice].cantidad++;
            console.log('Added');
        }
    }

    // Guardo carrito en localStorage
    localStorage.setItem('infoCarrito', JSON.stringify(carrito));
    Mostrar();
}

// Función para vaciar carrito
function Vaciar() {
    carrito = [];
    localStorage.removeItem('infoCarrito');
    console.log('Empty');
    Mostrar();
}

Mostrar();