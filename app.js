require("dotenv").config();
const express = require('express')
const morgan = require("morgan");
const path = require("path");
const app = express()
const PORT = 3000

app.use(express.json());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/api/client", require("./routes/client"))

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});