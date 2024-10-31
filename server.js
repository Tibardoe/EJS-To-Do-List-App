import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const items = [{ id: 1, task: "Go to Accra tomorrow" }, { id: 2, task: "Take money from Emmanuella today" }];

let lastId = 2;

app.get("/", (req, res) => {
    res.render("index.ejs", { items: items })
});

app.post("/post", (req, res) => {
    const newId = lastId += 1
    const item = {
        id: newId,
        task: req.body.task
    };

    try {
        items.push(item);
        res.redirect("/");
    } catch (error) {
        console.log(error.message);
    };
});

app.patch("/edit/:id", (req, res) => {
    const id = parseInt(req.body.id);
    const findItem = items.find(item => item.id === id);
    console.log(findItem);

    // const updateItem = {
    //     id: 
    // }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});