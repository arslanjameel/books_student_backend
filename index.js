const express = require('express');
const pool= require('./db');
const cors= require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // req.body

//get all
app.get("/students",async (req,res) => {
    try {
        const allStudents=await pool.query("SELECT * FROM student ");
        res.json(allStudents.rows);
    }
    catch (error) {
        console.error(error.message);
    }
})
//get all books
app.get("/books",async (req,res) => {
    try {
        const allBooks=await pool.query("SELECT * FROM book ");
        res.json(allBooks.rows);
    }
    catch (error) {
        console.error(error.message);
    }
})
// get one
app.get("/student/:id",async (req,res) => {
    const {id} = req.params
    try {
        const student=await pool.query("SELECT * FROM student WHERE id=$1",
            [id]);
        res.json(student.rows[0]);
    }
    catch (error) {
        console.error(error.message);
    }
})
//get one book
app.get("/book/:id",async (req,res) => {
    const {id} = req.params
    try {
        const book=await pool.query("SELECT * FROM book WHERE id=$1",
            [id]);
        res.json(book.rows[0]);
    }
    catch (error) {
        console.error(error.message);
    }
})
// create a new
//add student
app.post("/student",async (req,res) => {
    try {
        const{first_name, last_name}=req.body;
        const newStudent=await pool.query(
            "INSERT INTO student (first_name, last_name) VALUES ($1, $2) RETURNING *",
            [first_name, last_name]);
        res.json(newStudent.rows[0]);
    }
    catch (error) {
        console.error(error.message);
    }
});
//add book
app.post("/book",async (req,res) => {
    try {
        const{name, author,borrowed,date,return_date,student_id}=req.body;
        const newBook=await pool.query(
            "INSERT INTO book (name,author,borrowed,date,return_date,student_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [name, author,borrowed,date,return_date,student_id]);
        res.json(newBook.rows[0]);
    }
    catch (error) {
        console.error(error.message);
    }
})
// update
app.put("/student/:id",async (req,res) => {
    const {id} = req.params;
    const {first_name,last_name} = req.body;
    try {
        const updateStudent=await pool.query("UPDATE student SET first_name=$1,last_name=$2 WHERE id=$3",
            [first_name,last_name,id]);
        res.json("Updated successfully");
    }
    catch (error) {
        console.error(error.message);
    }
})
//update book
app.put("/book/:id",async (req,res) => {
    const {id} = req.params;
    const {name, author,borrowed,date,return_date,student_id} = req.body;
    try {
        const updateBook=await pool.query("UPDATE book SET name=$1, author=$2,borrowed=$3,date=$4,return_date=$5,student_id=$6 WHERE id=$7",
            [name, author,borrowed,date,return_date,student_id,id]);
        res.json("Updated successfully");
    }
    catch (error) {
        console.error(error.message);
    }
})
//delete
app.delete("/student/:id",async (req,res) => {
    const {id} = req.params
    try {
        const deleteStudent=await pool.query("DELETE FROM student WHERE id=$1",
            [id]);
        res.json("Delete successfully");
    }
    catch (error) {
        console.error(error.message);
    }
})
//delete book
app.delete("/book/:id",async (req,res) => {
    const {id} = req.params
    try {
        const deleteBook=await pool.query("DELETE FROM book WHERE id=$1",
            [id]);
        res.json("Delete successfully");
    }
    catch (error) {
        console.error(error.message);
    }
})

app.listen(5000,()=>{
    console.log('Server running at http://localhost:5000');
})