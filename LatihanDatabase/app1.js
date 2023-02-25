const express = require("express");
const app1 = express();
const port = 3000;
const userRouter = require("./src/routes/user");
const databaseBuku = require("./src/databases/connectionUser")

app1.use(express.urlencoded({ extended: true }));
app1.use("/api/v1", userRouter)

const initApp = async() =>{
    console.log("Testing Database Connection");
    try {

        await databaseBuku.authenticate();
        console.log("Berhasil konek");
        app1.listen(port, () =>
        console.log(`Example app listening on port ${port}!`)
        );
    } catch (error) {
        console.error("Tidak bisa konek database", error.original)
    }
}


initApp();