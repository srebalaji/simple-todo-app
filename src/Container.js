import React from 'react';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {activeTodos: this.props.activeTodos, finishedTodos: this.props.finishedTodos, todosState: "active"}
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({activeTodos: nextProps.activeTodos, finishedTodos: nextProps.finishedTodos, todosState: "active"});
  }
  updateTodo(list) {
    this.props.addItem(list);
  }

  deleteTodo(list_id) {
    this.props.finishItem(list_id);
  }

  getActiveTodos() {
    this.setState({todosState: "active"});
  }

  getFinishedTodos() {
    this.setState({todosState: "finished"});
  }

  render() {
    let lists = this.state.todosState === "active" ? this.state.activeTodos : this.state.finishedTodos;
    return (
      <div>
      <ul className="tab tab-block">
        <li className={this.state.todosState == "active" ? 'tab-item active' : 'tab-item'} onClick={this.getActiveTodos.bind(this)}><a>Todos</a></li>
        <li className={this.state.todosState == "finished" ? 'tab-item active' : 'tab-item'} onClick={this.getFinishedTodos.bind(this)}><a>Done</a></li>
      </ul>
      <br />
        <List items={lists} delete={this.deleteTodo}/>
        <Input update={this.updateTodo} />
      </div>
    );
  }
}

class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  addTodo(e) {
    document.getElementById('enterTodo').value = '';
    this.props.update(this.state.value);
  }

  render() {
    return (
      <form className="form-group">
      <input type="text" placeholder="Create" id="enterTodo" onChange={this.handleChange.bind(this)}/>
      <input type="button" className="btn btn-link" value="Add" onClick={this.addTodo.bind(this)} />
      </form>
    );
  }
}

class List extends React.Component {

  render() {
    const output = [];
    for(let key in this.props.items) {
      output.push(<ListItem item={ {item: this.props.items[key], id: key} } key={key} delete={this.props.delete} />);
    }
    return (
      <div className="title">
        {output}
      </div>
    );
  }
}

class ListItem extends React.Component {
  
  deleteItem(e) {
    let id = e.target.getAttribute('data-id');
    this.props.delete(id);
  }

  render() {
    return (
      <div className="tile-content"><p className="tile-title">{this.props.item.item} <span data-id={this.props.item.id} onClick={this.deleteItem.bind(this)}>x</span></p></div>
    );
  }
}

export default Container;