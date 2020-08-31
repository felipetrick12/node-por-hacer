const fs = require('fs'); // el metodo es para importa el paquete de npm 


let listadoPorHacer = []; //el array que va tener las tareas asignadas

const guardardb = () => { // se crea este metodo para la logica de lo que vamos almacenar en el json

    let data = JSON.stringify(listadoPorHacer); // stringify convierte un  objeto javascrip en un string json 

    fs.writeFile('db/data.json', data, (err) => { // guardar y enviar la data al archivo al archivo json 
        if (err) throw new Error('no se guardo el archivo', err);
    })
}

const cargarDb = () => { // enviar informacion al json
    try { // envia el valor del listado por hacer

        listadoPorHacer = require('../db/data.json'); // si se encuentra un archivo .json el crea una nueva tarea
        console.log(listadoPorHacer);
    } catch (error) {
        listadoPorHacer = []; // si no crea el array vacio
    }

}
const getListado = () => {
    cargarDb();
    return listadoPorHacer;
}

const crear = (descripcion) => { // crear es el metodo y recibe una descripcion

    cargarDb(); //para enviar las tareas al archivo JSON
    let porHacer = {
        descripcion,
        completado: false // se crea un objeto para hacer 
    };
    listadoPorHacer.push(porHacer); // se añade el obejeto al array
    guardardb(); // se envia el metodo cuando se ejecuta el metodo crear
    return porHacer; //retorna el metodo recien creado que es porHacer, eso hace que solo retorne lo que se acabe de crear
}

const actualizar = (descripcion, completado = true) => { // recibe los parametros que va actualizar
    cargarDb(); // carga los archivos que ya estan creados en la db
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion); // crea una variable y almacena lo que encontro el metodo, busca la palabra clave y la compara con la descripcion que registro el usuario
    if (index >= 0) { // busca lo que tiene el objeto en la posicion 0
        listadoPorHacer[index].completado = completado; // cambia el argumento lo actualiza
        guardardb(); // guarda los cambios
        return true; // si se cumple es verdadero
    } else {
        return false // si no se cumple no lo es
    }
}
const borrar = (descripcion) => {
    cargarDb();
    let nuevolistado = listadoPorHacer.filter(tarea => { return tarea.descripcion !== descripcion });
    // se crea un nuvevo listado ya que al filtrar el mensaje e incontrarlo se crea un nuevo array
    if (listadoPorHacer.length === nuevolistado.length) { // si hay las mismas dimensiones del array es por que no se borro nada

        return false; // si se cumple es verdadero
    } else {
        // si  se cumple 
        listadoPorHacer = nuevolistado; // el listado guardado  
        guardardb(); // guarda los cambios
        return true
    }

}


module.exports = { // Se exporta este metodo para que pueda recibir el valor de descpricion en el metodo crear, el valor se recibe atravez de una lectura por consola
    crear,
    getListado, // se envian todos los metodos creados 
    actualizar,
    borrar
}