const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080
const path = require("path");
const uuid = require("uuid").v4;
const fs = require("fs");

console.log(uuid());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// require("./routes.js")(app);

const notes = [];

/// html routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// app.post("/api/notes", function(req, res) {

// });

/// api routes


app.get("/api/notes", function(err, res) {
    try {

        notes = fs.readFile("public/db/db.json", "utf8");

        notes = JSON.parse(notes);


    } catch (err) {
        console.log(err);
    }

    res.json(notes);
});



app.post("/api/notes", function(req, res) {
    try {

        notes = fs.readFile("public/db/db.json", "utf8");
        console.log(notes);


        notes = JSON.parse(notes);

        req.body.id = notes.length;

        notes.push({ id: uuid(), ...notes })

        notes.push(req.body);

        notes = JSON.stringify(notes);

        fs.writeFile("public/db/db.json", notes, "utf8", function(err) {

            if (err) throw err;
        });

        res.json(JSON.parse(notes));

        // error Handling
    } catch (err) {
        throw err;

    }
});


app.delete("/api/notes/:id", function(req, res) {

    try {

        notes = fs.readFile("public/db/db.json", "utf8");

        notes = JSON.parse(notes);

        notes = notes.filter(function(note) {
            return note.id != req.params.id;
        });

        notes = JSON.stringify(notes);

        fs.writeFile("public/db/db.json", notes, "utf8", function(err) {

            if (err) throw err;
        });


        res.send(JSON.parse(notes));
    } catch (err) {
        throw err;
    }
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT)
});

//  async function getNotes(){
//      const notes = await readFile("db/db.json", "utf8")
//      return JSON.parse(notes)
// //  }

//  async function makeNotes(newNote){
//      const db = await this.getNotes();
//      db.push({id: uuid(), ...newNote})
//      return writeFile("db/db.json", JSON.stringify(db, null, 2))
//  }
// //  async function deletNotes(){
//      const db = await this.getnotes();


//  }