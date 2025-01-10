import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);
    const api = process.env.SOFTWARE_API || 'http://localhost:4000/api/students';


    useEffect(() => {
        allUsers();
    }, []);

    const allUsers = async () => {
        try {

            const response = await axios.get(`${api}`);
            const data = await response.data;
            setUsers(data);
        } catch (error) {
            console.error('Erreur de recuperation des utilisateurs', error);
        }

    }
    return (
        <div>
            <p>Liste des utilisateurs</p>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Telephone</th>
                        <th>Actions</th>
                    </tr>

                </thead>
          <tbody>

         
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.telephone}</td>
                    <td>
                        <button>Detail</button><button>Edition</button><button>Suppression</button>
                    </td>
                </tr>
                   
            ))}

            </tbody>
            </table>
        </div>
    );
}
  export default UserList;