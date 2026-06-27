const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.use(express.json()); // JSON Parser
app.use(express.urlencoded({ extended: true })); // URL-encoded Parser

app.set("view engine", "ejs"); // Configuration setting for express // When i use res.render(), use EJS as the template engine

// app.use(express.static(path.join(__dirname, "public"))); // Static file middleware

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join(" ")}.txt`,
    req.body.details,
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Something went wrong!");
      }
      res.redirect("/");
    },
  );
});

app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    if (err) {
      console.error(err);
      return res.send("File not found");
    }
    res.render("open", { filename: req.params.filename, filedata: filedata });
  });
});

app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    if (err) {
      console.error(err);
      return res.send("File not found");
    }

    res.render("edit", {
      filename: req.params.filename,
      filedata: filedata,
    });
  });
});

app.post("/edit", (req, res) => {
  const oldPath = `./files/${req.body.previous}`;
  const newPath = `./files/${req.body.new}.txt`;

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(err);
      return res.send("Error renaming file");
    }

    fs.writeFile(newPath, req.body.details, (err) => {
      if (err) {
        console.error(err);
        return res.send("Error updating file");
      }

      res.redirect("/");
    });
  });
});

app.post("/delete", (req, res) => {
  fs.unlink(`./files/${req.body.filename}`, (err) => {
    if (err) {
      console.error(err);
      return res.send("Error deleting file");
    }

    res.redirect("/");
  });
});
app.listen(3000, () => {
  console.log("Server is running");
});
