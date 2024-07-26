import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {createTodo, getTodoById, updateTodo} from "../services/TodoService";

const TodoComponent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState("");

    const navigate = useNavigate();

    const {id} = useParams();

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        completed: '',
    });

    useEffect(() => {
        if (id) {
            // fetchEmployee(id);
            getTodoById(id).then(response => {
                const todo = response.data;
                setTitle(todo.title);
                setDescription(todo.description);
                setCompleted(todo.completed);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveOrUpdateTodo(e) {
        e.preventDefault();

        if (validateForm()) {
            const todo = {title, description, completed};
            console.log('Todo => ' + JSON.stringify(todo));

            if (id) {
                updateTodo(todo, id).then(response => {
                    console.log(response.data);
                    navigate('/todos');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createTodo(todo).then(response => {
                    console.log(response.data);
                    navigate('/todos');
                }).catch(error => {
                    console.error('There was an error!', error);
                });
            }

        }
    }

    function validateForm() {
        let valid = true;
        const copyErrors = {...errors};

        if (!title) {
            copyErrors.title = 'Title is required';
            valid = false;
        } else {
            copyErrors.title = '';
        }

        if (!description) {
            copyErrors.description = 'Description is required';
            valid = false;
        } else {
            copyErrors.description = '';
        }

        if (!completed) {
            copyErrors.completed = 'Completed is required';
            valid = false;
        } else {
            copyErrors.completed = '';
        }

        setErrors(copyErrors);
        return valid;
    }

    function pageTitle() {
        return id ? "Update Todo" : "Add Todo";
    }

    return (
        <div className="container">
            <br></br>
            <div className="card col-md-6 offset-md-3 offset-md-3">
                <h3 className="text-center">{pageTitle()}</h3>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Title: </label>
                            <input placeholder="Title" name="title" className="form-control"
                                   value={title} onChange={e => setTitle(e.target.value)}/>
                            <div style={{color: 'red'}}>{errors.title}</div>
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input placeholder="Description" name="description" className="form-control"
                                   value={description} onChange={e => setDescription(e.target.value)}/>
                            <div style={{color: 'red'}}>{errors.description}</div>
                        </div>
                        <div className="form-group">
                            <label>Completed: </label>
                            <select name="completed" className="form-control" value={completed}
                                    onChange={e => setCompleted(e.target.value)}>
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <button className="btn btn-success" onClick={saveOrUpdateTodo}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TodoComponent;