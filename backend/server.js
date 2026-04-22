const express = require("express");

const app = express();

const recommendRoute = require("./routes/recommend");
const chatRoute = require("./routes/chat");
const adminRoute = require("./routes/admin");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Insurance Recommendation API Running");
});

app.use("/recommend", recommendRoute);

app.use("/chat", chatRoute);

app.use("/admin", adminRoute);


app.listen(5000, () => {
    console.log("Server running on port 5000");
});