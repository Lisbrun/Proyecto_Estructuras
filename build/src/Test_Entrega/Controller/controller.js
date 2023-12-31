"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConjuntoDisjuntoFunction = exports.bstFunction = exports.findNotesFunction = exports.priorityQueueFunction = exports.doubleLinkedListFunction = exports.queueFunction = exports.stackFunction = void 0;
const queue_1 = require("../../../Structures/cola/queue");
const doubleLinkedLIst_1 = require("../../../Structures/doubleLinkedList/doubleLinkedLIst");
const stack_1 = require("../../../Structures/pila/stack");
const uuid_1 = require("uuid");
const QueuePriority_1 = require("../../../Structures/ColaPrioritaria/QueuePriority");
const Avl_1 = require("../../../Structures/AVL/Avl");
const Bst_1 = require("../../../Structures/BST/Bst");
const Disjoinset_1 = require("../../../Structures/ConjuntosDisjuntos/Disjoinset");
const stackFunction = (_req, res) => {
    class record {
        constructor() {
            this.stack = new stack_1.Stack();
        }
        buscarCambioTipo(tipoBuscado) {
            const cambiosDelTipoBuscado = new doubleLinkedLIst_1.DoubleLinkedList();
            const historialTemp = new stack_1.Stack();
            while (this.stack.size() != 0) {
                const cambio = this.stack.pop();
                historialTemp.push(cambio);
                if (cambio.cambios === tipoBuscado) {
                    cambiosDelTipoBuscado.addEnd(cambio);
                }
            }
            return cambiosDelTipoBuscado;
        }
    }
    let start = Date.now();
    let cambioCosas;
    (function (cambioCosas) {
        cambioCosas[cambioCosas["add"] = 0] = "add";
        cambioCosas[cambioCosas["delete"] = 1] = "delete";
        cambioCosas[cambioCosas["create"] = 2] = "create";
        cambioCosas[cambioCosas["updated"] = 3] = "updated";
    })(cambioCosas || (cambioCosas = {}));
    let objects = 1000;
    let historial = new record();
    const crearObjetos = () => {
        const fecha = Date.now();
        const cambioRandom = Math.floor(Math.random() * 4);
        const changes = {
            date: fecha,
            cambios: cambioRandom
        };
        return changes;
    };
    for (let index = 0; index < objects; index++) {
        const cambio = crearObjetos();
        historial.stack.push(cambio);
    }
    historial.buscarCambioTipo(cambioCosas.create);
    while (historial.stack.size() != 0) {
        historial.stack.pop();
    }
    let timeTaken = Date.now() - start;
    res.json({ message: 'Total time taken : ' + timeTaken + ' milliseconds' });
    console.log('Total time taken : ' + timeTaken + ' milliseconds');
};
exports.stackFunction = stackFunction;
const queueFunction = (_req, res) => {
    class papelera {
        constructor() {
            this.queue = new queue_1.Queue();
        }
        calcFechaEliminacion() {
            const fechaActual = new Date();
            fechaActual.setDate(fechaActual.getDate() - 1); //Tenemos que hacer que las fechas hayan pasado para eliminarlo
            return fechaActual.toISOString();
        }
        agregarPapelera(nota) {
            nota.fechaEliminacion = this.calcFechaEliminacion();
            this.queue.enqueue(nota); //Al tener fechaEliminacion, indica que tienen que entrar a papelera
        }
        borrarPapelera(nota) {
            if (nota.fechaEliminacion &&
                new Date(nota.fechaEliminacion) < new Date()) {
                this.queue.dequeue();
            }
        }
    }
    let start = Date.now();
    let objects = 1000;
    const a = new papelera();
    const crearNotas = () => {
        const nota = {
            idNota: (0, uuid_1.v4)(),
            titulo: 'Nota de prueba',
            descripcion: 'Esta es una nota de prueba',
            fecha: '2023-10-08',
            fechaEliminacion: null,
            idFolder: null
        };
        return nota;
    };
    for (let index = 0; index < objects; index++) {
        const nota = crearNotas();
        a.agregarPapelera(nota);
    }
    for (let index = 0; index < objects; index++) {
        a.borrarPapelera(a.queue.peek());
    }
    let timeTaken = Date.now() - start;
    res.json({ message: 'Total time taken : ' + timeTaken + ' milliseconds' });
    console.log('Total time taken : ' + timeTaken + ' milliseconds');
};
exports.queueFunction = queueFunction;
const crearNotas = () => {
    const nota = {
        idNota: (0, uuid_1.v4)(),
        titulo: 'Nota de prueba',
        descripcion: 'Esta es una nota de prueba',
        fecha: '2023-10-08',
        fechaEliminacion: null,
        idFolder: null
    };
    return nota;
};
class AvlFolder {
    constructor(value) {
        this.notaPrueba = crearNotas();
        this.comparadorNotas = (a, b) => {
            if (a.idNota < b.idNota)
                return -1;
            else if (a.idNota > b.idNota)
                return 1;
            return 0;
        };
        this.AVLTree = new Avl_1.AVLTree(this.comparadorNotas);
        this.value = 0;
        this.value = value;
    }
    insertNote(nota) {
        this.AVLTree.insert(nota);
    }
    findNote(idNota) {
        this.notaPrueba.idNota = idNota;
        const notaRespuesta = this.AVLTree.find(this.AVLTree.root, this.notaPrueba);
        if (notaRespuesta) {
            return notaRespuesta.value;
        }
        else {
            return null;
        }
    }
}
const doubleLinkedListFunction = (_req, res) => {
    class Folder {
        constructor() {
            this.DoubleLinkedList = new doubleLinkedLIst_1.DoubleLinkedList();
        }
        addLinkedList(Nota) {
            // Nota: Notes
            this.DoubleLinkedList.addEnd(Nota);
            // this.DoubleLinkedList.addEnd(number)
        }
        changePosition(inicialPos, finalPos) {
            this.DoubleLinkedList.change(inicialPos, finalPos);
        }
    }
    const Gennumber = (min = 0, max = objectData) => {
        const randomDecimal = Math.random();
        const RandomNumber = Math.floor(randomDecimal * (max - min)) + min;
        return RandomNumber;
    };
    let start = Date.now();
    let objectData = 100000;
    const crearNotas = () => {
        const nota = {
            idNota: (0, uuid_1.v4)(),
            titulo: 'Nota de prueba',
            descripcion: 'Esta es una nota de prueba',
            fecha: '2023-10-08',
            fechaEliminacion: null,
            idFolder: null
        };
        return nota;
    };
    // const genNumberTest = (): number => {
    //   const randomDecimal = Math.random()
    //   const randomNumber = Math.floor(randomDecimal * 100) + 1
    //   return randomNumber
    // }
    const folder = new Folder();
    for (let index = 1; index < objectData; index++) {
        const nota = crearNotas();
        // const number = genNumberTest()
        folder.addLinkedList(nota);
    }
    for (let index = 0; index < objectData / 2; index++) {
        folder.changePosition(index, Gennumber(0, objectData - 100));
    }
    for (let index = 0; index < objectData; index++) {
        folder.DoubleLinkedList.deleteEnd();
    }
    let timeTaken = Date.now() - start;
    res.json({ message: 'Total time taken : ' + timeTaken + ' milliseconds' });
    console.log('Total time taken : ' + timeTaken + ' milliseconds');
};
exports.doubleLinkedListFunction = doubleLinkedListFunction;
const priorityQueueFunction = (_req, res) => {
    function generateRandomDate() {
        const minTimestamp = 0;
        const maxTimestamp = Date.now();
        const randomTimestamp = Math.floor(Math.random() * (maxTimestamp - minTimestamp + 1) + minTimestamp);
        const randomDate = new Date(randomTimestamp);
        return randomDate;
    }
    let start = Date.now();
    let objectData = 100000;
    const createFolder = () => {
        const folder = {
            idCarpeta: Math.floor(Math.random() * objectData),
            nombre: 'Carpeta de prueba',
            created: generateRandomDate()
        };
        return folder;
    };
    const ArrayObjects = [];
    for (let i = 0; i < objectData; i++) {
        const folder = createFolder();
        ArrayObjects.push(folder);
    }
    const queue = new QueuePriority_1.PriorityQueue(ArrayObjects); // encolar en la cola prioritaria
    for (let i = 0; i < queue.size(); i++) {
        // desencolar
        queue.dequeue();
    }
    let timeTaken = Date.now() - start;
    res.json({
        message: 'Total time taken : ' + timeTaken + ' milliseconds',
        objets: objectData
    });
    console.log('Total time taken : ' + timeTaken + ' milliseconds');
};
exports.priorityQueueFunction = priorityQueueFunction;
const createTestNotes = () => {
    const folderList = [];
    const carpetas = 100;
    const tasks = 900;
    for (let i = 0; i < carpetas; i++) {
        const folder = new AvlFolder(i);
        folderList.push(folder);
    }
    for (let i = 0; i < tasks; i++) {
        const nota = crearNotas();
        const randomFolder = Math.floor(Math.random() * carpetas);
        const folder = folderList[randomFolder];
        folder.insertNote(nota);
    }
    return folderList;
};
const createTestIds = () => {
    const n = 1000;
    const pruebas = [];
    for (let i = 0; i < n; i++) {
        const id = (0, uuid_1.v4)();
        pruebas.push(id);
    }
    return pruebas;
};
const testNotes = createTestNotes();
const testIds = createTestIds();
const findNotesFunction = (_req, res) => {
    const resultados = new doubleLinkedLIst_1.DoubleLinkedList();
    let start = Date.now();
    for (let i = 0; i < 100000; i++) {
        const testFind = testIds[i];
        for (let j = 0; j < 100; j++) {
            const testFolder = testNotes[j];
            const res = testFolder.findNote(testFind);
            resultados.addEnd(res);
        }
    }
    let timeTaken = Date.now() - start;
    res.json({
        message: 'Total time taken : ' + timeTaken + ' milliseconds'
    });
    console.log('Total time taken : ' + timeTaken + ' milliseconds');
};
exports.findNotesFunction = findNotesFunction;
const bstFunction = (_req, res) => {
    function generateRandomDate() {
        const minTimestamp = 0;
        const maxTimestamp = Date.now();
        const randomTimestamp = Math.floor(Math.random() * (maxTimestamp - minTimestamp + 1) + minTimestamp);
        const randomDate = new Date(randomTimestamp);
        return randomDate;
    }
    const start = Date.now();
    const objectData1 = 100;
    const objectData2 = 1000;
    const carpetas = [];
    const notas = [];
    const createFolder = () => {
        const folder = {
            idCarpeta: 0,
            nombre: '',
            created: generateRandomDate()
        };
        return folder;
    };
    const createNotas = () => {
        const nota = {
            idNota: (0, uuid_1.v4)(),
            titulo: '',
            descripcion: 'Esta es una nota de prueba',
            fecha: '2023-10-08',
            fechaEliminacion: null,
            idFolder: null
        };
        return nota;
    };
    for (let index = 0; index < objectData1; index++) {
        const folder = createFolder();
        folder.idCarpeta = index;
        folder.nombre = `Carpeta de prueba ${index}`;
        carpetas.push(folder);
    }
    for (let index = 0; index < objectData2; index++) {
        const nota = createNotas();
        nota.idFolder = Math.floor(Math.random() * objectData1);
        nota.titulo = `Nota de prueba ${index}`;
        notas.push(nota);
    }
    const resultados = [];
    for (let index = 0; index < carpetas.length; index++) {
        const arbolNotas = new Bst_1.BinarySearchTree();
        notas.forEach((nota) => {
            if (nota.idFolder === index) {
                arbolNotas.insert(nota);
            }
        });
        if (arbolNotas.search(notas[1])) {
            resultados.push(carpetas[index].nombre);
        }
    }
    const timeTaken = Date.now() - start;
    res.json({
        message: `Total time taken, ${timeTaken}`,
        Notes: notas[1],
        results: resultados,
        objets: objectData2
    });
};
exports.bstFunction = bstFunction;
const ConjuntoDisjuntoFunction = (_req, res) => {
    let start = Date.now();
    let objectData = 10;
    const conjuntosDisjuntos = new Disjoinset_1.ConjuntoDisjunto();
    // Insertar a la estructura
    for (let i = 0; i < objectData; i++) {
        const folder = {
            idNota: i,
            titulo: 'Nota de prueba',
            descripcion: 'Esta es una nota de prueba',
            idFolder: i,
            idCarpeta: i,
            nombre: 'Carpeta de prueba'
        };
        conjuntosDisjuntos.agregarNotaACarpeta(folder.idNota, folder.idCarpeta);
    }
    // Cambiar nota de carpeta
    for (let i = 0; i < objectData; i++) {
        conjuntosDisjuntos.cambiarCarpetaDeNota(i, Math.floor(Math.random() * 101));
    }
    // // Obtener carpeta de nota
    // for(let i = 0; i < objectData; i++){
    // conjuntosDisjuntos.obtenerCarpetaDeNota(i)
    // }
    let timeTaken = Date.now() - start;
    res.json({
        message: 'Total time taken : ' + timeTaken + ' milliseconds',
        objets: objectData
    });
    console.log('Total time taken : ' + timeTaken + ' milliseconds');
};
exports.ConjuntoDisjuntoFunction = ConjuntoDisjuntoFunction;
