const express = require("express");
const app = express();
var satelize = require("satelize");

app.get("/", (req, res) => {
  //PORT

  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  // prints date in YYYY-MM-DD format
  console.log(year + "-" + month + "-" + date);

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  console.log(
    year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
  );

  // prints time in HH:MM format
  res.send(hours + ":" + minutes);
});

const port = process.env.PORT || 3000;

app.get("/api/v1/ip", (req, res) => {
  satelize.satelize({ ip: "112.134.252.90" }, (err, payload) =>
    res.send(payload)
  );
});

// app.get('/api/v1/:id',(req,res)=>{res.send(req.params)})
// app.get('/api/v1/:id',(req,res)=>{res.send(req.query)}) ?sortByname
const courese = [
  { cid: 1, cuore: "AKA" },
  { cid: 2, cuore: "AKA" },
  { cid: 3, cuore: "AKA" },
];

app.get("/api/v1/course", (req, res) => {
  res.send(courese);
});

const timzones = require("./timezone.json");


console.log(timzones.filter(x => x.includes("America")))
app.get("/api/v1/timezones", (req, res) => {
res.header("Content-Type",'application/json');
  res.send(JSON.stringify(timzones));
});

app.get("/api/v1/:id", (req, res) => {
  console.log(req.params.id);
  const course = courese.find((c) => c.cid === parseInt(req.params.id));
  if (!course) res.status(404).send("The course with not");
  res.send(course);
});

app.listen(port, () => console.log(`Listening on port ${port}...... `));
