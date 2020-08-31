const argv = require('./config/yargs').argv; // optimizacion de argumentos 
const porHacer = require('./por-hacer/por-hacer'); // requerir las tareas asignadas
const colors = require('colors');
const { actualizar } = require('./por-hacer/por-hacer');

let comando = argv._[0]; // crear argumentos

switch (comando) { //opciones de los comandos , que son validados por el yargs
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion); // se crea una variable la que almacena lo digitado por consola
        console.log('tarea creada', tarea); //se realiza la tarea 
        break;
    case 'listar':
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log('===Por hacer==='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('==============='.green);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let eliminar = porHacer.borrar(argv.descripcion);
        console.log('tarea eliminada', eliminar);
        break;


    default:
        console.log('comando no reconocido');
        break;
}