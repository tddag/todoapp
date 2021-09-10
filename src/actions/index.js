import * as api from '../api';



let _id = 1;
export function uniqueId() {
    return _id++;
}


export function fetchTasksSucceeded(tasks) {
    return {
        type: 'FETCH_TASKS_SUCCEEDED',
        payload: {
            tasks
        }
    }
}

export function fetchTasks() {
    return dispatch => {
        api.fetchTasks().then(resp => {
            console.log(resp)
            dispatch(fetchTasksSucceeded(resp.data));
        });
    }
}

function createTaskSucceeded(task) {
    return {
        type: 'CREATE_TASK_SUCCEEDED',
        payload: {
            task,
        },
    };
}

export function createTask({ title, description, status = 'Unstarted' }) {
    return dispatch => {
        api.createTask({ title, description, status}).then(resp => {
            dispatch(createTaskSucceeded(resp.data));
        });
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