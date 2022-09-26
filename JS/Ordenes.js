const cuerpoTabla = document.getElementById("cuerpoTabla");
const formdetalle = document.getElementById("formdetalle");
const txtNombre = document.getElementById("txtNombre");
const cmbProducto = document.getElementById("cmbProducto");
const txtCantidad = document.getElementById("txtCantidad");
const txtPrecio = document.getElementById("txtPrecio");
const inputFecha = document.getElementById("inputFecha");
const btnAddOrden = document.getElementById("btnAddOrden");
const btnFinishOrder = document.getElementById("btnFinishOrder");
const txtTotal = document.getElementById("txtTotal");

let facturas = [];
let arregloDetalle = [];

const productos = [
  {
    id: 0,
    nombre: "--seleccione--",
    precio: 0,
  },
  {
    id: 1,
    nombre: "2x1",
    precio: 123.0,
  },
  {
    id: 2,
    nombre: "Paleta Crema Galleta",
    precio: 80.0,
  },
  {
    id: 3,
    nombre: "Fruta Rellena",
    precio: 25.0,
  },
  {
    id: 4,
    nombre: "Super Cono",
    precio: 10.0,
  },
  {
    id: 5,
    nombre: "Cono Dulce",
    precio: 10.0,
  },
  {
    id: 6,
    nombre: "Cono Simple",
    precio: 10.0,
  },
  {
    id: 7,
    nombre: "Cono Doble",
    precio: 10.0,
  },
  {
    id: 8,
    nombre: "Cono Jumbo",
    precio: 10.0,
  },
  {
    id: 9,
    nombre: "Vaca Negra",
    precio: 10.0,
  },
  {
    id: 10,
    nombre: "Malteada",
    precio: 10.0,
  },
  {
    id: 11,
    nombre: "Payasito",
    precio: 10.0,
  },
  {
    id: 12,
    nombre: "Capuccino",
    precio: 10.0,
  },
  {
    id: 13,
    nombre: "Fanta Naranja",
    precio: 10.0,
  },
  {
    id: 14,
    nombre: "Fanta Roja",
    precio: 10.0,
  },
  {
    id: 15,
    nombre: "Coca~Cola",
    precio: 10.0,
  },
  {
    id: 16,
    nombre: "Jugo del Valle",
    precio: 10.0,
  },
];

const llenerProductos = () => {
    productos.forEach((p) => {
      const opcion = document.createElement("option");
      opcion.value = p.id;
      opcion.innerText = p.nombre;
      cmbProducto.appendChild(opcion);
    });
  };
  llenerProductos();
  
  const getProducto = (id) => {
    const objProducto = productos.find((p) => p.id === +id);
  
    return objProducto.nombre;
  };
  
  const getPrecioProducto = (id) => {
    const objProducto = productos.find((p) => p.id === +id);
  
    return objProducto.precio;
  };

  const eliminarDetalleById = (id) => {
	arregloDetalle = arregloDetalle.filter((detalle) => {
	  if (+id !== +detalle.Producto) {
		return detalle;
	  }
	});
  
	redibujarTabla();
  };

const redibujarTabla = () => {
    cuerpoTabla.innerHTML = "";
  
    arregloDetalle.forEach((detalle) => {
      let fila = document.createElement("tr");
      fila.innerHTML = `<td>${detalle.Cliente}</td>
          <td>${getProducto(detalle.Producto)}</td>
          <td>${detalle.Cantidad}</td>
          <td>${detalle.Precio}</td>
          <td>${detalle.Total}</td>`;
  
      let tdEliminar = document.createElement("td");
  
      let botonEliminar = document.createElement("button");
      botonEliminar.classList.add("btn", "btn-danger");
      botonEliminar.innerText = "Eliminar";
      tdEliminar.appendChild(botonEliminar);
      botonEliminar.addEventListener("click", () => {
        eliminarDetalleById(detalle.Producto);
      });
      fila.appendChild(tdEliminar);
      cuerpoTabla.appendChild(fila);
    });
  };

const verificarFacturasLocalStorage = () => {
    const facturasLs = JSON.parse(localStorage.getItem("facturas"));
    facturas = facturasLs || [];
  };
  
  verificarFacturasLocalStorage();

  //

  const agregarDetalle = (detalle) => {
    const resultado = arregloDetalle.find((d) => {
      if (+detalle.Producto === +d.Producto) {
        return d;
      }
    });
  
    if (resultado) {
      arregloDetalle = arregloDetalle.map((d) => {
        if (+d.Producto === +detalle.Producto) {
          return {
			  Cliente: d.Cliente,
			Producto: d.Producto,
            cant: +d.cant + +detalle.cant,
            Precio: d.Precio,
            Total: +d.Precio * (+d.cant + +detalle.cant),
          };
        }
        return d;
      });
    } else {
      arregloDetalle.push(detalle);
    }
  };
function addtable(){
    
    const objDetalle = {
        Cliente: txtNombre.value,
        Producto: cmbProducto.value,
        Cantidad: txtCantidad.value,
        Precio: txtPrecio.value,
		Total: txtTotal.value,
      };
    
      agregarDetalle(objDetalle);
    
      redibujarTabla();

	  txtCantidad.innerText = "";
}
function finishorder(){
	/*
     let objFactura = {
        Cliente: txtNombre.value,
        Producto: cmbProducto.value,
        Cantidad: txtCantidad.value,
        Precio: txtPrecio.value,
        Fecha: inputFecha.value,
		Total: txtTotal.value,
        detalle: arregloDetalle,
      };
      formDetalle.reset();
    
      facturas.push(objFactura); 
    
      Guardando en el localstorage
      localStorage.setItem("facturas", JSON.stringify(facturas));*/
	  window.print(); 
	  
      arregloDetalle = [];
      redibujarTabla();
}

  cmbProducto.addEventListener("change", (e) => {
    const precio = getPrecioProducto(e.target.value);
  
    if (precio) {
      txtPrecio.value = precio;
      calcularTotal();
    }
  });
  
  const calcularTotal = () => {
	  const precio = +txtPrecio.value;
    const cantidad = +txtCantidad.value;
    const total = cantidad * precio;
	txtTotal.value = total;
  };
  
  txtPrecio.addEventListener("keyup", () => {
    calcularTotal();
  });