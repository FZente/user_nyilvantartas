import express from "express";
import * as db from "./util/database.js"
import bodyParser from 'body-parser';

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(bodyParser.json())

app.get('/users', (req, res) => {
    try{
        const users = db.getAllUsers();
        res.status(200).json(users);
    }catch (error){
        res.status(500).json({message: `${error}`});
    }
});

app.get('/users/:id', (req, res) => {
    try{
        const users = db.getUserById(+req.params.id);
        if (!users){
            return res.status(400).json("User not found!");
        }
        res.status(200).json(users);
    }catch (error){
        res.status(500).json({message: `${error}`});
    }
});

app.post('/users', (req, res) => {
    try{
        // const users = db.createUser(email, password)
        // if (!email || !password){
        //     res.status(400).json("Email or password is wrong!")
        // }
        // const update = {email, password}
        // users.push(update);
        // res.status(200).json(users);
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json("Email or password is wrong!")
        }
        const savedUser = db.createUser(email, password);
        if (savedUser.changes != 1){
            return res.status(422).json({message: "Unprocessable Entity"});
        }
        res.status(201).json({id: savedUser.lastInsertRowid, email, password});
    }catch (error){
        res.status(500).json({message: `${error}`});
    }
});

app.put('/users/:id', (req, res) => {
    try{
        const {email, password} = req.body;
        const id = +req.params.id;
        const updatedUser = db.updateUser(id, email, password);
        if (updatedUser.changes != 1){
            return res.status(422).json({message: "Unprocessable Entity"});
        }
        res.status(200).json({ id, email, password})
    }catch (error){
        res.status(500).json({message: `${error}`});
    }
});

app.delete('/users/:id', (req, res) => {
    try{
        const deletedUser = db.deleteUser(+req.params.id);
        if (deletedUser.changes != 1){
            return res.status(422).json({message: "Unprocessable Entity"});
        }
        res.status(200).json("Delete successfull!")
    }catch (error){
        res.status(500).json({message: `${error}`});
    }
});

// app.listen('', PORT => {
//     console.log(`Server runs on ${PORT}`);
// })

app.listen(PORT, () => console.log(`Server runs on ${PORT}`));