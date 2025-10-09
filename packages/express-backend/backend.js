import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};
function generateID(){
  return Math.floor(100000 + Math.random() * 900000).toString();
}
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByNameAndJob = (name, job) =>{
    return users['users_list'].filter(
        (user) => user["name"] === name && user['job'] === job
    );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
    const idx = users.users_list.findIndex((u) => u.id === id);
    if (idx === -1) return false;
    users.users_list.splice(idx, 1);
    return true;
};


app.get("/users", (req,res) => {
    const {name, job} = req.query;

    if(name && job){
        const result = {users_list: findUserByNameAndJob(name, job)};
        return res.send(result);
    }
    if(name){
        const result = {users_list: findUserByName(name)};
        return res.send(result);
    }

    res.send(users);
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});



app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id=generateID();
  addUser(userToAdd);
  res.status(201).json(userToAdd);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const deleted = deleteUserById(id);
    if(!deleted) return res.status(404).send("Resource not found.");
    res.status(204).send();
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});