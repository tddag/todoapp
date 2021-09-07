const mockTasks = [
    {
      id: 1, 
      title: 'Learn Redux',
      description: 'The store, actions, and reducers, oh my!',
      status: 'Unstarted',
    },
    {
      id: 2,
      title: 'Peace on Earth',
      description: 'No big deal.',
      status: 'In Progress',
    },
    {
        id: 3,
        title: 'Go to gym',
        description: 'Deadlift, Squat, Bench Press',
        status: 'Completed',
      },
      {
        id: 4,
        title: 'Learn guitar',
        description: 'Anatomy, Holding a guitar, Tuning a guitar, playing open chords, strumming in rhythm',
        status: 'In Progress',
      },
  ];

export default function tasks(state = {tasks: mockTasks}, action) {
    return state
}