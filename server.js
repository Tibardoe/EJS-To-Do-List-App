import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const items = [{ id: 1, task: "Go to Accra tomorrow", isEditable: false }, { id: 2, task: "Take money from Emmanuella today", isEditable: false }];

let lastId = 2;

app.get("/", (req, res) => {
    res.render("index.ejs", { items: items })
});

app.post("/post", (req, res) => {
    const newId = lastId += 1
    const item = {
        id: newId,
        task: req.body.task,
        isEditable: false
    };

    if (item.task) {
        try {
            items.push(item);
            res.redirect("/")
        } catch (error) {
            console.log(error.message);
        };
    }
});

app.patch("/post/edit/:id", (req, res) => {
    const id = parseInt(req.body.id);
    const findItem = items.find(item => item.id === id);
    const updateItem = {
        id: findItem.id,
        task: findItem.task
    }
});

app.post("/post/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const findItem = items.findIndex(item => item.id === id);

    if (findItem !== -1) {
        items.splice(findItem, 1)
        res.redirect("/")
    } else {
        res.status(404).send("Cannot find item")
    }


});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});