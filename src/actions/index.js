import axios from 'axios';




let _id = 1;
export function uniqueId() {
    return _id++;
}


export function fetchTasksSucceeded(tasks) {
    return {
        type: 'FETCH_TASKS_SUCCCEEDED',
        payload: {
            tasks
        }
    }
}

export function fetchTasks() {
    return dispatch => {
        axios.get('http://localhost:3001/tasks').then(resp => {
            dispatch(fetchTasksSucceeded(resp.data));
        });
    }
}

export function createTask({ title, description }) {
    return {
        type: 'CREATE_TASK',
        payload: {
            id: uniqueId(),
            title,
            description,
            status: 'Unstarted',
        },
    };
}

export function editTask(id, params = {}) {
    return {
        type: 'EDIT_TASK',
        payload: {
            id, 
            params
        }
    };
}