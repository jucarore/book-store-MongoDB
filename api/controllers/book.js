'use strict';
// Include our "db"
//var db = require('../../config/db')();
const Book = require ('../models/book.model');
// Exports all the functions to perform on the db
module.exports = {saveBook, updateBook, deleteBook, getAllBooks, getBook};

// Use the Mongoose ORM for modeling your objects in MongoDB
const mongoose = require('mongoose');

function saveBook(req, res) {
    Book.create(req.body).then((book) => {
        res.json({success: 1, description: "Book created"});
        console.log('Book created: ',book)
    }).catch((err) => {
        console.log('Error save Todo', err);
        res.status(204).send();
    })
}

function updateBook(req, res) {
    Book.update({_id: new mongoose.Types.ObjectId(req.swagger.params.id.value)}, {$set: req.body}).then((book) => {
        console.log('Updated created: ',book);
        res.json({success: 1, description: "Book updated!"});
    }).catch((err) => {
        console.log('Error update Book', err);
        res.status(204).send();
    });
}

function deleteBook(req, res) {
    Book.deleteOne({_id: req.swagger.params.id.value}).then(() => {
        res.json({success: 1, description: "Book deleted!"});
    }).catch((err) => {
        console.log('Error delete Book', err);
        res.status(204).send();
    })

}

function getAllBooks(req, res) {

        Book.find().then((books) => {
            res.status(200).json({books});
        })

}

function getBook(req, res) {
    let id = req.swagger.params.id.value;
    Book.findById(id).then((book) => {
        res.status(200).json(book);
    })
}


