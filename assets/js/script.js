//Variables: Nombre de cliente, Lista de Productos, Total de la compra, Descuento | Constantes: Monto para aplicar descuento, Maximo de productos permitidos
//Validaciones de carrito vacío, precio o cantidad invalida
//Funciones: Agregar producto, Eliminar producto, Calcular total, Aplicar descuento, Mostrar resumen de compra
const products = [
    { id: 1, name: "Manzanas", price: 1200,img: "https://cdn.pixabay.com/photo/2017/07/01/21/15/apple-2462753_1280.jpg", description: "Manzanas frescas y jugosas" },
    { id: 2, name: "Pan", price: 1500, img: "https://cdn.pixabay.com/photo/2016/03/26/18/23/bread-1281053_1280.jpg", description: "Pan recién horneado" },
    { id: 3, name: "Leche", price: 1000, img: "https://cdn.pixabay.com/photo/2014/11/05/16/35/milk-518067_1280.jpg", description: "Leche fresca de granja"},
    { id: 4, name: "Huevos", price: 2500, img: "https://cdn.pixabay.com/photo/2016/07/08/18/18/egg-1504992_1280.png", description: "Huevos orgánicos de gallinas libres" },
    { id: 5, name: "Carne", price: 6000, img: "https://cdn.pixabay.com/photo/2014/07/06/18/35/beef-roulades-385751_1280.jpg", description: "Carne de res de alta calidad" },
    { id: 5, name: "Pescado", price: 7000, img: "https://cdn.pixabay.com/photo/2024/06/22/14/58/fish-seller-8846497_1280.jpg", description: "Pescado fresco del día" },
    { id: 7, name: "Lechuga", price: 1000, img: "https://cdn.pixabay.com/photo/2015/05/17/14/29/salad-771056_1280.jpg", description: "Lechuga frescas y saludables" },
    { id: 8, name: "Arroz", price: 900, img: "https://cdn.pixabay.com/photo/2017/06/07/16/24/rice-2380808_1280.jpg", description: "Arroz de grano largo" },
    { id: 9, name: "Fideos", price: 800, img: "https://cdn.pixabay.com/photo/2024/07/01/14/31/pasta-8865344_1280.jpg", description: "Fideos de trigo integral" },
    { id: 10, name: "Aceite", price: 1100, img: "https://cdn.pixabay.com/photo/2016/06/03/14/32/olive-oil-1433506_1280.jpg", description: "Aceite de oliva virgen extra" },
    { id: 11, name: "Azúcar", price: 750, img: "https://cdn.pixabay.com/photo/2020/04/13/22/55/sugar-5040276_1280.jpg", description: "Azúcar orgánica" },
    { id: 12, name: "Plátanos", price: 1500, img: "https://cdn.pixabay.com/photo/2016/06/29/22/37/bananas-1487965_1280.jpg", description: "Plátanos de excelente calidad" }     
];

const productsInCart = [];
const cartModal = document.getElementById('cart-modal');
const cartList = document.getElementById('cart-list');
const cartTotal =  document.getElementById('cart-total');
const cartQuantity = document.getElementById('cart-quantity');
const minDiscountAmount = 20000; //Monto mínimo para aplicar descuento
const discount = 10; //10% de dcto al superar el monto de 20000

//Función para mostrar los productos en cards obteniendo sus datos desde un array de objetos.
function showProducts (){
    const container = document.getElementById('products-container');
    container.innerHTML = "" //Vaciar container cada vez que se recarga la página

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        const card = document.createElement('div');
        card.className = 'card'

        card.innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="card-img" />
        <div>
            <h3 class="card-title">${product.name}</h3>
            <p class="card-text">$${product.price}</p>
            <button class="btn add-btn" data-id="${product.id}">Agregar al carrito</button>
        </div>
        `;

        container.appendChild(card);
    }

    connectCardBtns();   
}

//Función para asociar el click del botón de las cards según el id de producto
function connectCardBtns() {
    const btns = document.querySelectorAll('.add-btn');
    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute('data-id'));
            addToCart(id);
            alert("Producto agregado al carrito");
        });
    });
}

//Función para añadir porductos al carrito
function addToCart(id) {
    const producto = products.find(p => p.id === id);
    if(!producto) return;

    const cartItem = productsInCart.find(item => item.id === id);

    if(cartItem) {
        if(cartItem.cantidad < 3) {
            cartItem.cantidad++;
        } else {
            alert("Solo puedes llevar máximo 3 unidades de cada producto");
        }
    } else {
     productsInCart.push({ ...producto, cantidad:1 });
    }

      const totalOfProducts = productsInCart.reduce((total, item) => total + item.cantidad, 0);
      cartQuantity.textContent = totalOfProducts;
}

//Funciones para apertura y cierre de modal
function openCartModal() {
    cartRender();
    cartModal.style.display = "block";
}

function closeCartModal() {
    cartModal.style.display = "none";
}

function cartRender() {
    cartList.innerHTML = "";
    let total = 0;

    productsInCart.forEach(item => {
        console.log(item);
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.cantidad} - $ ${ item.price * item.cantidad}`
        cartList.appendChild(li);
        total += item.price * parseInt(item.cantidad);
    })
    cartTotal.textContent = `$ ${total}`;
}

showProducts(products);

//ToDo: Añadir funcionalidad para eliminar y vaciar los elementos del carrito
//ToDo: Añadir funcionalidad de descuento segun total de la compra
//ToDo: Añadir botones para aumentar o disminuir cantidad de productos
//ToDo: Aplicar lógica para busqueda de productos por nombre
//ToDo: Mostrar una alerta con transiciones suaves al agregar productos al carrito