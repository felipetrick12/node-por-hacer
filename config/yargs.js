const descripcion = {
    demand: true,
    alias: "d",
    desc: "descripcion de la tarea por hacer",

}

const completado = {
    default: true,
    alias: 'c',
    desc: 'marca la tarea pendiente'
}


const argv = require("yargs")
    .command("crear", "crea una tarea por hacer", {
        descripcion
    })
    .command("actualizar", "actualiza el estado de la tarea", {
        descripcion,
        completado
    }).command("borrar", "borra la tarea", {
        descripcion
    }).help()
    .argv;

module.exports = {
    argv
};