import React, { useState } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";

const UserForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("");
    const [users, setUsers] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { name, email, bio };
        axios.post("https://adobe-social-media-production.up.railway.app/users", user).then((response) => {
            setUsers([...users, response.data]);
            setName("");
            setEmail("")
            setBio("");
        });
    };

    const handleUpdate = (id) => {
        const user = { name, email, bio };
        axios.put(`https://adobe-social-media-production.up.railway.app/users/${id}`, user).then((response) => {
            const updatedUsers = users.map((u) =>
                u.id === response.data.id ? response.data : u
            );
            setUsers(updatedUsers);
            setName("");
            setEmail("")
            setBio("");
        });
    };

    const handleDelete = (id) => {
        axios.delete(`https://adobe-social-media-production.up.railway.app/users/${id}`).then(() => {
            const updatedUsers = users.filter((u) => u._id !== id);
            setUsers(updatedUsers);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box>
                    <TextField id="outlined-basic" label="Name" variant="outlined" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Box>
                <Box>
                   
                    <TextField id="outlined-basic" label="Email" Box="Outlined" variant="outlined" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Box>
                <Box>
                    <TextField id="outlined-basic" label="Bio" variant="outlined" type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                </Box>
                <button type="submit">Create User</button>
            </form>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.name} -{user.email}- {user.bio}
                        <button onClick={() => handleUpdate(user._id)}>Update</button>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserForm;
