import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import TasksPage from './components/TasksPage';
import { createTask, editTask, fetchTasks, filterTasks, fetchProjects, setCurrentProjectId } from './actions';
import FlashMessage from './components/FlashMessage';
import { getGroupedAndFilteredTasks, getProjects } from './reducers/';

class App extends Component {
componentDidMount() {
  this.props.dispatch(fetchTasks());
  this.props.dispatch(fetchProjects());
}

  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({title, description }));
  }

  onStatusChange = (id, status) => {
    this.props.dispatch(editTask(id, {status }));
  }

  onSearch = searchTerm => {
    this.props.dispatch(filterTasks(searchTerm));
  }

  onCurrentProjectChange = e => {
    this.props.dispatch(setCurrentProjectId(Number(e.target.value)));
  }

  render() {
    return (
      <div className="container">
        {this.props.error && <FlashMessage message={this.props.error} />}
        <div className="main-content">
          <Header 
            projects={this.props.projects}
            onCurrentProjectChange={this.onCurrentProjectChange}
          />
          <TasksPage 
            tasks={this.props.tasks} 
            onCreateTask={this.onCreateTask} 
            onSearch={this.onSearch}
            onStatusChange={this.onStatusChange} 
            isLoading={this.props.isLoading}/>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { isLoading, error } = state.projects;

  return { 
    tasks: getGroupedAndFilteredTasks(state), 
    projects: getProjects(state),
    isLoading, 
    error, 
  };
}

export default connect(mapStateToProps) (App);