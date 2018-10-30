const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port); // then start listening with our express server once we have synced
console.log(`Listening at port ${port}`);
