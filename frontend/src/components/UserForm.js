import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

const UserForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("");
    const [users, setUsers] = useState([]);
    console.log('users:', users)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        handleClose()
    };

    const handleDelete = (id) => {
        axios.delete(`https://adobe-social-media-production.up.railway.app/users/${id}`).then(() => {
            const updatedUsers = users.filter((u) => u._id !== id);
            setUsers(updatedUsers);
        });
    };

    return (<>
        <Box>
            <h2 style={{ textAlign: 'center' }}>Create User</h2>
        </Box>
        <div style={{ display: "flex", justifyContent: "center" }}>

            <form onSubmit={handleSubmit} style={{ width: "30%", paddingRight: "30px" }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField sx={{ width: "100%", marginBottom: "30px", marginTop: "30px" }} id="outlined-basic" label="Name" variant="outlined" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField sx={{ width: "100%", marginBottom: "30px" }} id="outlined-basic" label="Email" Box="Outlined" variant="outlined" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField sx={{ width: "100%", marginBottom: "30px" }} id="outlined-basic" label="Bio" variant="outlined" type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                </Box>
                <Button variant="contained" sx={{ display: "flex", margin: "auto" }} type="submit">Create User</Button>
            </form>
            <TableContainer sx={{ width: "50%" }} >
                <Table sx={{ minWidth: 40 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Bio</TableCell>
                            <TableCell align="left">Update</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.name}
                            >
                                <TableCell align="left">{user.name}</TableCell>
                                <TableCell align="left">{user.email}</TableCell>
                                <TableCell align="left">{user.bio}</TableCell>
                                <TableCell align="left">
                                    <Button variant="outlined" onClick={handleClickOpen}>
                                        Update
                                    </Button>
                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>Update User</DialogTitle>
                                        <DialogContent>
                                            <Box sx={{ width: "400px" }}>
                                                <TextField id="outlined-basic" sx={{ width: "100%", marginBottom: "30px", marginTop: "30px" }} label="Name" variant="outlined" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                                                <TextField id="outlined-basic" sx={{ width: "100%", marginBottom: "30px" }} label="Bio" variant="outlined" type="text" value={bio} required onChange={(e) => setBio(e.target.value)} />
                                            </Box>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button variant="contained" onClick={() => handleUpdate(user._id)}>Update</Button>
                                        </DialogActions>
                                    </Dialog>



                                </TableCell>
                                <TableCell align="left"> <Button variant="outlined" color="error" onClick={() => handleDelete(user._id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </>
    );
};

export default UserForm;
