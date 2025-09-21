import express from "express";
import * as db from "./util/database.js"

const PORT = 3000;
const app = express();

app.get('/users', (req, res) => {
    res.status(201).json();
});
app.get('/users/:id', (req, res) => {});
app.post('/users', (req, res) => {});
app.put('/users/:id', (req, res) => {});
app.delete('/users/:id', (req, res) => {});

// app.listen('', PORT => {
//     console.log(`Server runs on ${PORT}`);
// })

app.listen(PORT, () => console.log(`Server runs on ${PORT}`));