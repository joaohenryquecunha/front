export const routes = {
  getTasks: (filter) => `tarefas?type=${filter}`,

  createTasks: () => "tarefas",

  deleteTasks: (task) => `tarefas/${task}`,

  updateTasks: (task) => `tarefas/${task}`,
}