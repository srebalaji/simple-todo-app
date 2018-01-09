import React, { Component } from 'react';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {activeTodos: new Map(), finishedTodos: new Map(), todosState: "active"};
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  updateTodo(list) {
    this.setState({activeTodos: this.state.activeTodos.set(Math.floor((Math.random() * 100) + 1), list)});
  }

  deleteTodo(list_id) {
    let done = this.state.activeTodos.get(parseInt(list_id));
    this.state.activeTodos.delete(parseInt(list_id));
    this.setState({finishedTodos: this.state.finishedTodos.set(list_id, done)});
  }

  getActiveTodos() {
    this.setState({todosState: "active"});
  }

  getFinishedTodos() {
    this.setState({todosState: "finished"});
  }

  render() {
    let lists = this.state.todosState == "active" ? this.state.activeTodos : this.state.finishedTodos;
    return (
      <div>
      <ul>
        <li className="active" onClick={this.getActiveTodos.bind(this)}>Todos</li>
        <li onClick={this.getFinishedTodos.bind(this)}>Done</li>
      </ul>
      <br />
        <Input update={this.updateTodo} />
        <List items={lists} delete={this.deleteTodo}/>
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
      <form>
      <input type="text" placeholder="Create" id="enterTodo" onChange={this.handleChange.bind(this)}/>
      <input type="button" value="Add" onClick={this.addTodo.bind(this)} />
      </form>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const output = [];
    for(let [key, item] of this.props.items) {
      output.push(<ListItem item={ {item: item, id: key} } key={key} delete={this.props.delete} />);
    }
    return (
      <ul>{output}</ul>
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
      <li>{this.props.item.item} <span data-id={this.props.item.id} onClick={this.deleteItem.bind(this)}>x</span></li>
    );
  }
}

export default Container;