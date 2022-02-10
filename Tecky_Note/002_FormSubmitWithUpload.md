### Form Submit with File Upload

##  npm install multer
```
npm i multer @types/multer
```

-   Modify the form

```HTML
<form ... enctype="multipart/form-data">
    ...
    ...
</form>
```

-   Server Setup

```Typescript
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`);
    },
});
const upload = multer({ storage });

```

-   Update the route, add **upload.single("image")**

```Typescript
app.post("/students", upload.single("image"), async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    // read data from jsonfile
    const students: Student[] = await jsonfile.readFile(path.join(__dirname, "students.json"));
    // add a new student record to the array
    students.push({
        id: students.length + 1,
        name: req.body.studentName,
        email: req.body.studentEmail,
        filename: req.file?.filename,
    });
    // save the data into jsonfile
    await jsonfile.writeFile(path.join(__dirname, "students.json"), students);
    // redirect the client to new location
    res.redirect("/home.html");
});
```
