const express = require("express");

const app = express();

const recommendRoute = require("./routes/recommend");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Insurance Recommendation API Running");
});

app.use("/recommend", recommendRoute);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});