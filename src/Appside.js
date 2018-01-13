import React from 'react';
import Container from './Container';
import {storageLength, setStorage, getStorage} from './manageLocalStorage';

class Appside extends React.Component {
	constructor(props) {
		super(props);
		var projects = {};
		var items = {};
		var currentProject = 0;
		if (storageLength() !== 0) {
			projects = getStorage("projects");
			items = getStorage("items");
			currentProject = parseInt(Object.keys(projects)[0], 10);
		}
		this.state = {
			currentProject: currentProject,
			projects: projects,
			items: items
		}
		this.addProject = this.addProject.bind(this);
		this.updateLists = this.updateLists.bind(this);
		this.updateCurrentProject = this.updateCurrentProject.bind(this);
		this.finishItem = this.finishItem.bind(this);
	}

	addProject(project) {
		let project_id = Math.floor((Math.random() * 100000000) + 1);
		let items = this.state.items;
		items[project_id] = {};
		items[project_id]["active_todos"] = {};
		items[project_id]["finished_todos"] = {};

		let projects = this.state.projects;
		projects[project_id] = project;
		if (this.state.currentProject === 0) {
			this.setState({projects: this.state.projects, currentProject: parseInt(project_id, 10), items: items}, function() {
				setStorage("projects", this.state.projects);
				setStorage("items", this.state.items);
			});
		}
		else {
			this.setState({projects: this.state.projects, items: items}, function() {
				setStorage("projects", this.state.projects);
				setStorage("items", this.state.items);
			});
		}
	}

	updateCurrentProject(project_id) {
		this.setState({currentProject: parseInt(project_id, 10) });
	}

	updateLists(list_item) {
		let item_id = Math.floor((Math.random() * 100000000) + 1)
		this.state.items[this.state.currentProject]["active_todos"][item_id] = list_item;
		setStorage("items", this.state.items);
		this.forceUpdate();
	}

	finishItem(item_id) {
		let item = this.state.items[this.state.currentProject]["active_todos"][item_id];
		delete this.state.items[this.state.currentProject]["active_todos"][item_id];
		this.state.items[this.state.currentProject]["finished_todos"][item_id] = item;
		setStorage("items", this.state.items);
		this.forceUpdate();
	}

	render() {
		var container = '';
		var projectName = '';
		 if (Object.keys(this.state.projects).length !== 0) {
			container = <Container item_id={this.state.currentProject} activeTodos={this.state.items[this.state.currentProject]["active_todos"]} finishedTodos={this.state.items[this.state.currentProject]["finished_todos"]} addItem={this.updateLists} finishItem={this.finishItem}/>;
			projectName = this.state.projects[this.state.currentProject]
		}
		return (
			<div>
				{projectName}
				{this.state.projects.size !== 0 && <List lists={this.state.projects} updateCurrentProject={this.updateCurrentProject}/>}
				<Input addProject={this.addProject} />
				<hr />
				{container}
			</div>
		)
	}
}

class Input extends React.Component {
	
	addProject(e) {
		let project = this.refs.enterProject.value;
		document.getElementById('enterProject').value = '';
		this.props.addProject(project);
	}

	render() {
		return (
			<form>
	      <input type="text" placeholder="Create Project" id="enterProject" ref="enterProject"/>
	      <input type="button" value="Add" onClick={this.addProject.bind(this)} />
      </form>
		)
	}
}

class List extends React.Component {
	
	handleChange(e) {
		let id = e.target.getAttribute('data-id');
		this.props.updateCurrentProject(id);
	}
	
	render() {
		let output = [];
		for(let key in this.props.lists) {
			output.push(<li key={key} data-id={key} onClick={this.handleChange.bind(this)}>{this.props.lists[key]}</li>);
		}
		return(
			<ul>
				{output}
			</ul>
		)
	}
}

export default Appside;