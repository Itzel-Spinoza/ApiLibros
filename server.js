// Se importan las librerias a utilizar
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const port = 8080;
const app = express();

app.use(bodyParser.json());

// Funcion encargada de leer el archivo DATA.JSON que contiene
// algunos datos referentes a la API
const readData = () => {
    try {
        const data = fs.readFileSync('data.json');
        return JSON.parse(data);
    }catch(error) {
        console.log(error);
        return { libro: [] };
    }
};

// Funcion encargada de escribir dentro del archivo DATA.JSON
const writeData = (data) => {
    try {
        fs.writeFileSync('data.json', JSON.stringify(data));
    }catch(error) {
        console.log(error);
    }
}

/**
 * Creacion de rutas
 * 1. Ruta principal, solo muestra un mensaje en el navegador
 * 2. Ruta que muestra los datos de la API, los datos se obtienen mediante el
 *    metodo GET
 * 3. Ruta que muestra un valor en especifico mediante el id usando el metodo GET
 * 4. Ruta encargada de almacenar un nuevo valor dentro de la API mediante el metodo
 *    POST
 * 5. Ruta encargada de modificar el valor de un dato mediante el id usando el metodo PUT
 * 6. Ruta encargada de eliminar un valor mediante el id usando el metodo DELETE
*/
app.get('/', (req, res) => {
    res.send('Welcome to the BOOK API');
});

app.get('/libro', (req, res) => {
    const data = readData();
    res.json(data.libro);
});

app.get('/libro/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const libro = data.libro.find((libro) => libro.id === id);
    res.json(libro);
});

app.post('/libro', (req, res) => {
    const data = readData();
    const body = req.body;
    const newOrder = {
        id: data.libro.length + 1,
        ...body,
    };
    data.libro.push(newOrder);
    writeData(data);
    res.json(newOrder);
});

app.put('/libro/:id', (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const libroIndex = data.libro.findIndex((libro) => libro.id === id);
    data.libro[libroIndex] = {
        ...data.libro[libroIndex],
        ...body,
    };

    writeData(data);
    res.json({ message: "Order updated successfully."})
});

app.delete('/libro/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const libroIndex = data.libro.findIndex((libro) => libro.id === id);
    data.libro.splice(libroIndex, 1);
    writeData(data);
    res.json({ message: "Order deleted successfully" });
});


app.get('/libro', (req, res) => {
    const data = readData();
    res.json(data.libro);
});

app.get('/libro/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const libro = data.libro.find((libro) => libro.id === id);
    res.json(libro);
});

app.post('/libro', (req, res) => {
    const data = readData();
    const body = req.body;
    const newOrder = {
        id: data.libro.length + 1,
        ...body,
    };
    data.libro.push(newOrder);
    writeData(data);
    res.json(newOrder);
});

/* PARA CARRITO */
app.get('/carrito', (req, res) => {
    const data = readData();
    res.json(data.carrito);
});

app.get('/carrito/:id', (req, res) => {
    const data = readData();
    const id = req.params.id;
    const carrito = data.carrito.filter((item) => item.id === id);
    res.json(carrito);
});

app.post('/carrito', (req, res) => {
    const data = readData();
    const body = req.body;
    const newOrder = {
        ...body,
    };
    data.carrito.push(newOrder);
    writeData(data);
    res.json(newOrder);
});

app.put('/carrito/:id', (req, res) => {
    const data = readData();
    const body = req.body;
    const id = req.params.id;
    const orderIndex = data.carrito.findIndex((item) => item.id === id);
    data.carrito[orderIndex] = {
        ...data.carrito[orderIndex],
        ...body,
    };

    writeData(data);
    res.json({ message: "Order updated successfully."})
});

app.delete('/carrito/:id', (req, res) => {
    const data = readData();
    const id = req.params.id;
    const orderIndex = data.carrito.findIndex((item) => item.id === id);
    data.carrito.splice(orderIndex, 1);
    writeData(data);
    res.json({ message: "Order deleted successfully" });
});


app.get('/sumaTotal', (req, res) => {
    const data = readData();
    const totalSuma = data.carrito.reduce((sum, carrito) => sum + carrito.subtotal, 0);
    res.json({ result: totalSuma });
});

app.get('/mult/:num1/:num2', (req, res) => {
    const { num1, num2 } = req.params;
    const product = parseInt(num1) * parseFloat(num2);
    res.json({ result: product });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
