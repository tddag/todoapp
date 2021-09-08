import { uniqueId } from '../actions';

const mockTasks = [
    {
      id: uniqueId(), 
      title: 'Learn Redux',
      description: 'The store, actions, and reducers, oh my!',
      status: 'Unstarted',
    },
    {
      id: uniqueId(),
      title: 'Peace on Earth',
      description: 'No big deal.',
      status: 'In Progress',
    },
    {
        id: uniqueId(),
        title: 'Go to gym',
        description: 'Deadlift, Squat, Bench Press',
        status: 'Completed',
      },
      {
        id: uniqueId(),
        title: 'Learn guitar',
        description: 'Anatomy, Holding a guitar, Tuning a guitar, playing open chords, strumming in rhythm',
        status: 'In Progress',
      },
  ];

export default function tasks(state = {tasks: mockTasks}, action) {
    if (action.type === 'CREATE_TASK') {
        return { tasks: state.tasks.concat(action.payload)};
    }
    return state
}