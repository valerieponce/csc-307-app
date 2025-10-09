import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
    const[characters, setCharacters] = useState([]);


    function removeOneCharacter(index){
        const user = characters[index];
        if(!user) return;
        
        deleteUser(user.id)
            .then((res) => {
                console.log("delete status:", res.status);
                if(res.status === 204){
                    const updated = characters.filter((character, i) => i !== index);
                    setCharacters(updated);
                    return;
                }
                if(res.status === 404){
                    throw new Error("Resource not found (no user deleted).");
                }
                throw new Error(`Delete failed (${res.status})`);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    function fetchUsers(){
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }
    useEffect(()=>{
        fetchUsers()
        .then((res)=>res.json())
        .then((json)=>setCharacters(json["users_list"]))
        .catch((error)=>{console.log(error);});
    },[]);

    function postUser(person){
        const promise = fetch("http://localhost:8000/users",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(person),
        });
        return promise;
    }
    function deleteUser(id){
        return fetch(`http://localhost:8000/users/${encodeURIComponent(id)}`, {
            method: "DELETE",
        });
    }

    function updateList(person){
        postUser(person)
        .then((res)=>{
            console.log("response status:", res.status); //check that 201 is going through
            if(res.status === 201) return res.json();
            throw new Error("failed to create user");
        })
        .then((createdUser)=>
            setCharacters((prev) => [...prev, createdUser])
    )
        .catch((error)=>{
            console.log(error);
        })
    }

  return (
    <div className="container">
        <Table 
        characterData = {characters} 
        removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList}/>
    </div>
  );
}
export default MyApp;