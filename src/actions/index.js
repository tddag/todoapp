import * as api from '../api';
import { CALL_API } from '../middleware/api';

export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED';
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED;'
export const CREATE_TASK_STARTED = 'CREATE_TASK_STARTED';
export const CREATE_TASK_SUCCEEDED = 'CREATE_TASK_SUCCEEDED';
export const CREATE_TASK_FAILED = 'CREATE_TASK_FAILED';

export function fetchTasks() {
    return {
        [CALL_API]: {
            types: [FETCH_TASKS_STARTED, FETCH_TASKS_SUCCEEDED, FETCH_TASKS_FAILED],
            endpoint: '/tasks',
        },
    };
}

export function createTask({title, description, status = 'Unstarted' }) {
    return {
        [CALL_API]: {
            types: [CREATE_TASK_STARTED, CREATE_TASK_SUCCEEDED, CREATE_TASK_FAILED],
            endpoint: '/tasks',
            method: 'POST',
            body: {
                title,
                description,
                status,
            },
        },
    };
}

// export function fetchTasksSucceeded(tasks) {
//     return {
//         type: 'FETCH_TASKS_SUCCEEDED',
//         payload: {
//             tasks
//         }
//     }
// }


// function fetchTasksStarted() {
//     return {
//         type: 'FETCH_TASKS_STARTED',
//     };
// }

// function fetchTasksFailed(error) {
//     return {
//         type: 'FETCH_TASKS_FAILED',
//         payload: {
//             error,
//         },
//     };
// }

// export function fetchTasks() {
//     return dispatch => {
//         dispatch(fetchTasksStarted());

//         api.fetchTasks().then(resp => {
//             setTimeout( () => {
//                 dispatch(fetchTasksSucceeded(resp.data));
//             }, 1000 );
//         })
//         .catch (err => {
//             dispatch(fetchTasksFailed(err.message));
//         });
//     };
// }

// function createTaskSucceeded(task) {
//     return {
//         type: 'CREATE_TASK_SUCCEEDED',
//         payload: {
//             task,
//         },
//         meta: {
//             analytics: {
//                 event: 'create_task',
//                 data: {
//                     id: task.id,
//                 },
//             },
//         },
//     };
// }

// export function createTask({ title, description, status = 'Unstarted' }) {
//     return dispatch => {
//         api.createTask({ title, description, status}).then(resp => {
//             dispatch(createTaskSucceeded(resp.data));
//         });
//     };
// }

function editTaskSucceeded(task) {
    return {
        type: 'EDIT_TASK_SUCCEEDED',
        payload: {
            task,
        },
    };
}

export function editTask(id, params = {}) {
    return (dispatch, getState) => {
        const task = getTaskById(getState().tasks.tasks, id);
        const updatedTask = Object.assign({}, task, params);

        api.editTask(id, updatedTask).then(resp => {
            dispatch(editTaskSucceeded(resp.data));
        });
    };
}

function getTaskById(tasks, id) {
    return tasks.find(task => task.id === id);
}