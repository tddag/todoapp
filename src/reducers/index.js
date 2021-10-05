import { TASK_STATUSES } from '../constants';
import { createSelector } from 'reselect';


const initialTasksState = {
  items: [],
  isLoading: false,
  error: null,
};

const getTasks = state => state.tasks.tasks;


export function tasks(state = initialTasksState, action) {
  switch(action.type) {
    case 'RECEIVE_ENTITIES': {
      const { entities } = action.payload;
      if (entities && entities.tasks) {
        return {
          ...state,
          isLoading: false,
          items: entities.tasks,
        };
      }

      return state;
    }


    case 'TIMER_INCREMENT': {
      const nextTasks = Object.keys(state.items).map(taskId => {
        const task = state.items[taskId];

        if (task.id === action.payload.taskId) {
          return { ...task, timer: task.timer + 1};
        }

        return task;
      });
      return {
        ...state,
        tasks: nextTasks,
      };
    }

    // case 'CREATE_TASK': {
    //   return { tasks: state.tasks.concat(action.payload)};
    // }

    // case 'EDIT_TASK': {
    //   const { payload } = action;
    //   return {
    //     tasks: state.tasks.map(task => {
    //       if (task.id === payload.id) {
    //         return Object.assign({}, task, payload.params);
    //       }
    //       return task;
    //     })
    //   }
    // }

    // case 'FETCH_TASKS_STARTED': {
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // }

    // case 'FETCH_TASKS_SUCCEEDED': {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     tasks: action.payload.projects,
    //   };
    // }

    // case 'CREATE_TASK_SUCCEEDED': {
    //   return {
    //     ...state,
    //     tasks: state.tasks.concat(action.payload),
    //   };
    // }

    // case 'EDIT_TASK_SUCCEEDED': {
    //   const { payload } = action;
    //   const nextTasks = state.tasks.map(task => {
    //     if (task.id === payload.task.id) {
    //       return payload.task;
    //     }
    //     return task;
    //   })
    //   return {
    //     ...state,
    //     tasks: nextTasks,
    //   };
    // }

    // case 'FETCH_TASKS_FAILED': {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: action.payload.error,
    //   };
    // }



    // case 'FILTER_TASKS': {
    //   return { ...state, searchTerm: action.payload.searchTerm };
    // }

    default: {
      return state
    }
  }
}


const initialProjectsState = {
  items: [],
  isLoading: false,
  error: null,
};

export function projects(state = initialProjectsState, action) {
  switch (action.type) {
    case 'RECEIVE_ENTITIES': {
      const { entities } = action.payload;
      if (entities && entities.projects) {
        return {
          ...state,
          isLoading: false,
          items: entities.projects,
        };
      }
      
      return state;
    }

    case 'FETCH_PROJECTS_STARTED': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'FETCH_PROJECTS_SUCCEEDED': {
      return {
        ...state,
        isLoading: false,
        items: action.payload.projects,
      };
    }

    case 'CREATE_TASK_SUCCEEDED': {
      const { task } = action.payload;
      const projectIndex = state.items.findIndex(
        project => project.id === task.projectId,
      );
      const project = state.items[projectIndex];

      const nextProject = {
        ...project,
        tasks: project.tasks.concat(task),
      };

      return {
        ...state,
        items: [
          ...state.items.slice(0, projectIndex),
          nextProject,
          ...state.items.slice(projectIndex + 1),
        ],
      };
    }

    case 'EDIT_TASK_SUCCEEDED': {
      const { task } = action.payload;
      const projectIndex = state.items.findIndex(
        project => project.id === task.projectId,
      );
      const project = state.items[projectIndex];
      const taskIndex = project.tasks.findIndex(t => t.id === task.id);

      const nextProject = {
        ...project,
        task: [
          ...project.tasks.slice(0, taskIndex),
          task,
          ...project.tasks.slice(taskIndex + 1),
        ],
      };
      return {
        ...state,
        items: [
          ...state.items.slice(0, projectIndex),
          nextProject,
          ...state.items.slice(projectIndex + 1),
        ],
      };
    }

    default: {
      return state;
    }
  }
}

const initialPageState = {
  currentProjectId: null,
  searchTerm: '',
};

export function page(state = initialPageState, action) {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT_ID': {
      return {
        ...state,
        currentProjectId: action.payload.id,  
      };
    }

    case 'FILTER_TASKS': {
      return { ...state, searchTerm: action.searchTerm }
    }

    default: {
      return state;
    }
  }
}



const getSearchTerm = state => state.page.tasksSearchTerm; 

const getTasksByProjectId = state => {
  const { currentProjectId } = state.page;

  if (!currentProjectId || !state.projects.items[currentProjectId]) {
    return [];
  }

  const tasksIds = state.projects.items[currentProjectId].tasks;

  return tasksIds.map(id => state.tasks.items[id]);
}




export const getFilteredTasks = createSelector (
  [getTasksByProjectId, getSearchTerm],
  (tasks, searchTerm) => {
    return tasks.filter(task => task.title.match(new RegExp(searchTerm, 'i')));
  },
);

export const getGroupedAndFilteredTasks = createSelector(
  [getFilteredTasks],
  tasks => {
    const grouped = {};

    TASK_STATUSES.forEach(status => {
      grouped[status] = tasks.filter(task => task.status === status);
    });

    return grouped;
  }
)

export const getProjects = state => {
  return Object.keys(state.projects.items).map(id => {
    return state.projects.items[id];
  });
};

