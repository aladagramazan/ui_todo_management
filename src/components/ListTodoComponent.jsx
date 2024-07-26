import React, {useEffect, useState} from 'react'
import {completeTodo, deleteTodo, inCompleteTodo, listTodos} from "../services/TodoService";
import {useNavigate} from "react-router-dom";
import {isAdminUser} from "../services/AuthService";
const ListTodoComponent = () => {

    const [todos, setTodos] = useState([]);

    const navigate = useNavigate();

    const isAdmin = isAdminUser();

    useEffect(() => {
        getAllTodos();
    } , []);

    function getAllTodos() {
        listTodos().then(response => {
            setTodos(response.data);
        }).catch(error => {
            console.error('There was an error!', error);
        });
    }

    function addNewTodo() {
        navigate('/add-todo');
    }

    function updatedTodo(id) {
        navigate(`/update-todo/${id}`);
    }

    function removeTodo(id) {
        console.log('Delete todo with id: ' + id);
        deleteTodo(id).then(response => {
            console.log(response.data);
            getAllTodos();
        }).catch(error => {
            console.error(error);
        });
    }

    function markCompleteTodo(id) {
        completeTodo(id).then(response => {
            getAllTodos();
        }).catch(error => {
            console.error(error);
        })
    }

    function markInCompleteTodo(id) {
        inCompleteTodo(id).then(response => {
            getAllTodos();
        }).catch(error => {
            console.error(error);
        })
    }


    return (
        <div className="container">
            <h2 className="text-center">List of Todo</h2>
            {
                isAdmin &&
                <button className="btn btn-primary" onClick={addNewTodo}>Add Todo</button>
            }

            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(todo =>
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'Yes' : 'No'}</td>
                                <td>
                                    {
                                        isAdmin &&
                                        <button className="btn btn-info"
                                                onClick={() => updatedTodo(todo.id)}>Update
                                        </button>
                                    }
                                    {
                                        isAdmin &&
                                        <button className="btn btn-danger" onClick={() => removeTodo(todo.id)}
                                                style={{marginLeft: "10px"}}>Delete
                                        </button>
                                    }

                                    <button className="btn btn-success" onClick={() => markCompleteTodo(todo.id)}
                                            style={{marginLeft: "10px"}}>Complete
                                    </button>
                                    <button className="btn btn-info" onClick={() => markInCompleteTodo(todo.id)}
                                            style={{marginLeft: "10px"}}>In-Complete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ListTodoComponent
