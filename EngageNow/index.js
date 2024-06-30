import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
const port = 3000;

const db = new pg.Client({
  user: process.env.USER,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  host: process.env.HOST,
  password: process.env.PASSWORD,
});
db.connect();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/events", (req, res) => {
  res.render("events");
});
app.get("/services", (req, res) => {
  res.render("services");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/orgevents", (req, res) => {
  res.render("orgevents.ejs");
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});

app.post("/log-in", async (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM resident WHERE name = $1";

  db.query(query, [username], async (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      return res.send("Error logging in");
    }

    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log(user);
      try {
        if (await bcrypt.compare(password, user.password)) {
          res.render("dashboard.ejs", { name: user.name });
        } else {
          res.send("Invalid credentials");
        }
      } catch (error) {
        console.error("Erro comparing passwords", error);
        res.send("Error logging in");
      }
    } else {
      const query = "SELECT * FROM organization WHERE  name  =   $1";
      db.query(query, [username], async (err, result) => {
        if (err) {
          console.error("Error executing query", err.stack);
          res.send("Error logging in");
        } else {
          if (result.rows.length > 0) {
            const org = result.rows[0];
            console.log(org);
            try {
              if (await bcrypt.compare(password, org.password)) {
                res.render("dashboard.ejs", {
                  data: org,
                });
              } else {
                res.send("Invalid credentials");
              }
            } catch (error) {
              console.error("Error comparing passwords", error);
              res.send("Error logging in");
            }
          } else {
            res.send("Invalid credentials");
          }
        }
      });
    }
  });
});

app.post("/add-events", async (req, res) => {
  const { eventName, eventDate, eventTime, eventLocation, eventDescription } =
    req.body;

  try {
    const query = `
            INSERT INTO events (event_name, event_date, event_time, event_location, event_description)
            VALUES ($1, $2, $3, $4, $5)
        `;
    await db.query(query, [
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventDescription,
    ]);
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error adding event", error);
    res.send("Error adding event");
  }
});

app.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (req.body.role == "Resident") {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query =
        "INSERT INTO resident (name, password) VALUES ($1, $2) RETURNING id";
      db.query(query, [username, hashedPassword], (err, result) => {
        if (err) {
          console.error("Error executing query", err.stack);
          res.send("Error signing up");
        } else {
          res.redirect("/");
        }
      });
    } catch (error) {
      console.error("Error hashing password", error);
      res.send("Error signing up");
    }
  } else {
    try {
      console.log(req.body);
      const hashedPassword = await bcrypt.hash(password, 10);
      const query =
        "INSERT INTO organization (name, password,organization_name,contact,location,img) VALUES ($1, $2,$3,$4,$5,$6) RETURNING id";
      db.query(
        query,
        [
          username,
          hashedPassword,
          req.body.organization,
          req.body.contact,
          req.body.location,
          req.body.image,
        ],
        (err, result) => {
          if (err) {
            console.error("Error executing query", err.stack);
            res.send("Error signing up");
          } else {
            res.redirect("/");
          }
        }
      );
    } catch (error) {
      console.error("Error hashing password", error);
      res.send("Error signing up");
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
