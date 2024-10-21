const express = require("express");
const router = express.Router(); // Cambia 'app' por 'router'

const dotenv = require("dotenv");
dotenv.config();

// Conexión con la base de datos
const { connection } = require("../config.db");

// Get All Products
const getProduct = (request, response) => {
    connection.query("SELECT * FROM product", (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// Ruta para obtener todos los productos
router.route("/product").get(getProduct);

// Get Product By ID
const getProductByID = (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM product WHERE id = ?", [id], (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// Ruta para obtener producto por ID
router.route("/product/:id").get(getProductByID);

// Add New Product
const postProduct = (request, response) => {
    const { name, imagen, descripcion, price } = request.body;
    connection.query(
        "INSERT INTO product(name, imagen, descripcion, price) VALUES (?, ?, ?, ?)",
        [name, imagen, descripcion, price],
        (error, results) => {
            if (error) throw error;
            response.status(201).json({ message: "Producto añadido correctamente", affectedRows: results.affectedRows });
        }
    );
};

// Ruta para agregar un nuevo producto
router.route("/product").post(postProduct);

// Delete Product
const delProduct = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM product WHERE id = ?", [id], (error, results) => {
        if (error) throw error;
        response.status(200).json({ message: `Producto con ID ${id} eliminado` });
    });
};

// Ruta para eliminar un producto
router.route("/product/:id").delete(delProduct);

// Update all fields of a product
const updateProduct = (request, response) => {
    const { name, imagen, descripcion, price } = request.body;
    const id = request.params.id;
    connection.query(
        "UPDATE product SET name = ?, descripcion = ?, imagen = ?, price = ? WHERE id = ?",
        [name, descripcion, imagen, price, id],
        (error, results) => {
            if (error) throw error;
            response.status(200).json({ message: `Producto con ID ${id} actualizado` });
        }
    );
};

// Ruta para actualizar todos los campos de un producto
router.route("/product/:id").put(updateProduct);

// Update a single field of the product
const patchProduct = (request, response) => {
    const id = request.params.id;
    const { name, imagen, descripcion, price } = request.body;

    const fieldsToUpdate = [];
    const valuesToUpdate = [];

    if (name !== undefined) fieldsToUpdate.push("name = ?"), valuesToUpdate.push(name);
    if (descripcion !== undefined) fieldsToUpdate.push("descripcion = ?"), valuesToUpdate.push(descripcion);
    if (imagen !== undefined) fieldsToUpdate.push("imagen = ?"), valuesToUpdate.push(imagen);
    if (price !== undefined) fieldsToUpdate.push("price = ?"), valuesToUpdate.push(price);

    if (fieldsToUpdate.length === 0) {
        return response.status(400).json({ error: "No se proporcionaron campos para actualizar" });
    }

    const query = `UPDATE product SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
    valuesToUpdate.push(id);

    connection.query(query, valuesToUpdate, (error, results) => {
        if (error) throw error;
        response.status(200).json({ message: `Producto con ID ${id} actualizado exitosamente` });
    });
};

// Ruta para actualizar campos específicos de un producto
router.route("/product/:id").patch(patchProduct);

module.exports = router;
