import React from 'react';
import Container from './Container';
import  {storageLength, setStorage, getStorage} from './manageLocalStorage';

class Appside extends React.Component {
	constructor(props) {
		super(props);
		// let projects = new Map();
		// projects.set(1, "Personal");
		// projects.set(2, "Work");

		// let items = new Map(); //parent
		// items.set(1, new Map());
		// let item = items.get(1);
		// item.set("active_todos", new Map());
		// item.set("finished_todos", new Map());

		// items.set(2, new Map());
		// item = items.get(2);
		// item.set("active_todos", new Map());
		// item.set("finished_todos", new Map());
		var projects = {};
		var items = {};
		var currentProject = 0;
		if (storageLength() != 0) {
			projects = getStorage("projects");
			items = getStorage("items");
			currentProject = parseInt(Object.keys(projects)[0]);
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
		if (this.state.currentProject == 0) {
			this.setState({projects: this.state.projects, currentProject: parseInt(project_id), items: items}, function() {
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
		this.setState({currentProject: parseInt(project_id) });
	}

	updateLists(list_item) {
		let item_id = Math.floor((Math.random() * 100000000) + 1)
		// this.state.items.get(this.state.currentProject).get('active_todos').set(item_id, list_item);
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
		 if (Object.keys(this.state.projects).length != 0) {
			var container = <Container item_id={this.state.currentProject} activeTodos={this.state.items[this.state.currentProject]["active_todos"]} finishedTodos={this.state.items[this.state.currentProject]["finished_todos"]} addItem={this.updateLists} finishItem={this.finishItem}/>;
			var projectName = this.state.projects[this.state.currentProject]
		}
		else {
			var container = '';
			var projectName = '';
		}
		return (
			<div>
				{projectName}
				{this.state.projects.size != 0 && <List lists={this.state.projects} updateCurrentProject={this.updateCurrentProject}/>}
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