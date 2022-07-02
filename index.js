const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vynj7.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const toDoCollection = client.db("task_manager").collection("todo_tasks");
    const completedTaskCollection = client
      .db("task_manager")
      .collection("completed_tasks");

    app.get("/todo", async (req, res) => {
      const query = {};
      const cursor = toDoCollection.find(query);
      const todo = await cursor.toArray();
      res.send(todo);
    });

    app.post("/todo", async (req, res) => {
      const toDo = req.body;
      const result = await toDoCollection.insertOne(toDo);
      res.send(result);
    });
    app.post("/todo/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await toDoCollection.insertOne(query);
      res.send(result);
    });

    app.delete("/todo/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await toDoCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello from task manager");
});

app.listen(port, () => {
  console.log("listening to port");
});
