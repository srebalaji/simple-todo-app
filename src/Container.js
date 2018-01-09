import React, { Component } from 'react';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {todos: new Map()};
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  updateTodo(list) {
    // this.setState({todos: [...this.state.todos,{id: Math.floor((Math.random() * 100) + 1), todo: list}]});
    this.setState({todos: this.state.todos.set(Math.floor((Math.random() * 100) + 1), list)});
  }

  deleteTodo(list_id) {
    this.state.todos.delete(parseInt(list_id));
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <Input update={this.updateTodo} />
        <List items={this.state.todos} delete={this.deleteTodo}/>
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