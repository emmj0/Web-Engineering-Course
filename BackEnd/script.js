const express = require("express"); 
const add = require("./add");
const multiply = require("./multiply");
const divide = require("./divide");
const sub = require("./subtract");
const app = express(); 
const fileThings = require("./fileSystem");
const test = require("http");

test.createServer((req, res) => {
  const PORT = 3200;
  console.log(`Server is running on http://localhost:${PORT}`);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Hello, World! 🚀");
  res.end();
});

// add.add(5, 5);
// multiply.multiply(5, 5);
// divide.divide(5, 5);
// sub.sub(5, 5);

fileThings.fileThings();
console.log(add.add(5, 5));
console.log(multiply.multiply(5, 5));
console.log(divide.divide(5, 5));
console.log(sub.sub(5, 5));

const PORT = 3500;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World! 🚀"); 
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
