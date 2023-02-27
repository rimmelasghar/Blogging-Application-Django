import React from 'react';
import { variables } from './Variables.js';

export class Todolst extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Todos: [],
            description: "",
            status: "",
            todo: "",
            username: "",
            id:0
        }
    }
    gettoken(){
        fetch(variables)
    }
    refreshList() {
        fetch(variables.API_URL + 'todo/get')
            .then(response => response.json())
            .then(data => {
                this.setState({Todos: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }
    changeDescription = (e) => {
        this.setState({ description: e.target.value });
    }

    changeTodo = (e) => {
        this.setState({ todo: e.target.value });
    }
    changeStatus = (e) => {
        this.setState({ status: e.target.value });
    }


    render() {
        const {
            Todos,
            description,
            status,
            todo,
            username,
            id
        } = this.state;

        return (
            <div>
                Todos
            </div>
        )
    }
}
