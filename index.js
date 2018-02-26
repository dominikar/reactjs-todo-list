var TodoComponent = React.createClass({
    getInitialState: function () {
        return {
            todos: []
        }
    },
    render: function () {
        var todos = this.state.todos.map(function (item, index) {
            return (
                <TodoItem item={item} key={index} deleteFunction={this.deleteTodoItem}/>
            )
        }.bind(this));
        return (
            <div>
                <h1>To-do lista</h1>
                <ul className="list-group">
                    {todos}
                </ul>
                <AddTodoItem addFunction={this.addTodoItem}/>
            </div>
        )
    },
    deleteTodoItem: function (itemToDelete) {
        var todosWithoutDeletedItem = this.state.todos.filter(function (item, index) {
            return (item !== itemToDelete)
        });
        this.setState({
            todos: todosWithoutDeletedItem
        })
    },
    addTodoItem: function (itemToAdd) {
        var todosWithNewItem = this.state.todos;
        if (!todosWithNewItem.includes(itemToAdd)) {
            todosWithNewItem.push(itemToAdd);
            this.setState({
                todos: todosWithNewItem
            })
        }
    }

});

var TodoItem = React.createClass({
    render: function () {
        return (
            <li className="list-group-item">
                <div className="todo-item">
                    <span className="item-name">{this.props.item}</span>
                    <span className="item-delete btn btn-warning" onClick={this.deleteThisItem}>DONE</span>
                </div>
            </li>
        )
    },
    deleteThisItem: function () {
        this.props.deleteFunction(this.props.item);
    }
});

var AddTodoItem = React.createClass({
    render: function () {
        return (
            <form id="add-todo" className="input-group" onSubmit={this.addItem}>
                <input type="text" required ref="todoText"/>
                <input className="btn btn-primary" type="submit" value="Dodaj"/>
            </form>
        )
    },
    addItem: function (e) {
        e.preventDefault();
        this.props.addFunction(this.refs.todoText.value);
        this.refs.todoText.value = "";
    }
});

ReactDOM.render(<TodoComponent/>, document.querySelector('#todos'));