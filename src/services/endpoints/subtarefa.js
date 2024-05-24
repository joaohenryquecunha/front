export const routes = {
  
    createSubTasks: (task) => `tarefas/${task}/subtarefas`,
  
    deleteSubTasks: (task, subtask) => `tarefas/${task}/subtarefas/${subtask}`,
  
    updateSubTasks: (task, subtask) => `tarefas/${task}/subtarefas/${subtask}`,
  }