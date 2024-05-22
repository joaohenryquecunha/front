<template>
  <div class="dashboard">
    <b-modal ref="modal-new-task" id="modal-new-task" centered hide-footer hide-header>
      <div class="modal-all">
        <div class="body-modal">
          <div class="group-inputs">
            <input v-model="nameTask" type="text" class="title" name="nameTask" placeholder="Nome da tarefa" />
            <input v-model="descTask" type="text" class="description" name="descTask" placeholder="Descrição" />
            <div class="date-venc">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 1V5M6 1V5M1 9H19M3 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3Z"
                  stroke="#81858E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <date-picker clearable class="date" :editable="false" placeholder="Data de vencimento" date-venc
                v-model="vencTask" value-type="YYYY-MM-DD" format="DD/MM/YYYY"></date-picker>
            </div>
          </div>
        </div>
        <div class="footer-modal">
          <button class="button btn-white" @click="modalNew">Cancelar</button>
          <button class="button btn-dark" @click="createTask(1)">Criar tarefa</button>
        </div>
      </div>
    </b-modal>

    <b-modal ref="modal-new-subtask" id="modal-new-subtask" centered hide-footer hide-header>
      <div class="modal-all">
        <div class="body-modal">
          <div class="group-inputs">
            <input v-model="nameTask" type="text" class="title" name="nameTask" placeholder="Nome da subtarefa" />
            <input v-model="descTask" type="text" class="description" name="descTask" placeholder="Descrição" />
          </div>
        </div>
        <div class="footer-modal">
          <button class="button btn-white" @click="modalSubNew">Cancelar</button>
          <button class="button btn-dark" @click="createSubTask(1)">Criar subtarefa</button>
        </div>
      </div>
    </b-modal>

    <b-modal ref="modal-edit-task" id="modal-edit-task" centered hide-footer hide-header>
      <div class="modal-all">
        <div class="body-modal">
          <div class="group-inputs">
            <input v-model="nameTask" type="text" class="title" name="nameTask" placeholder="Nome da tarefa" />
            <input v-model="descTask" type="text" class="description" name="descTask" placeholder="Descrição" />
            <div class="date-venc">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 1V5M6 1V5M1 9H19M3 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3Z"
                  stroke="#81858E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <date-picker clearable class="date" :editable="false" placeholder="Data de vencimento" date-venc
                v-model="vencTask" value-type="YYYY-MM-DD" format="DD/MM/YYYY"></date-picker>
            </div>
          </div>
        </div>
        <div class="footer-modal">
          <button class="button btn-white" @click="modalEdit">Cancelar</button>
          <button class="button btn-dark" @click="editTask(1)">Editar tarefa</button>
        </div>
      </div>
    </b-modal>

    <b-modal ref="modal-edit-subtask" id="modal-edit-subtask" centered hide-footer hide-header>
      <div class="modal-all">
        <div class="body-modal">
          <div class="group-inputs">
            <input v-model="nameTask" type="text" class="title" name="nameTask" placeholder="Nome da subtarefa" />
            <input v-model="descTask" type="text" class="description" name="descTask" placeholder="Descrição" />
          </div>
        </div>
        <div class="footer-modal">
          <button class="button btn-white" @click="modalSubEdit">Cancelar</button>
          <button class="button btn-dark" @click="editSubTask(1)">Editar subtarefa</button>
        </div>
      </div>
    </b-modal>

   <b-modal ref="modal-view-task" id="modal-view-task" centered hide-footer hide-header>
      <div class="modal-all">
        <div class="header-modal">
          <div :class="{ 'time': 'time', 'venc': isTaskVencida(currentTask?.due_date) }">
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 1V5M6 1V5M1 9H19M3 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3Z"
                stroke="#009488" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <label v-if="!isTaskVencida(currentTask?.due_date)" for="">No prazo</label>
            <label v-if="isTaskVencida(currentTask?.due_date)" for="">Vencida</label>
          </div>
          <div class="functions">
            <span class="function" id="list-functions-task-1" @click="functionTask">
              <img src="@/assets/images/more.svg" alt="" />
              <div :class="{ 'functions-popover': true, show: showFunctionTask }" class="">
                <!-- ... (mantendo suas opções de função) ... -->
              </div>
            </span>
            <span class="function" @click="modalView(1)">
              <img src="@/assets/images/close.svg" alt="" />
            </span>
          </div>
        </div>
        <div class="body-modal view" v-if="currentTask">
          <div class="right">
            <div class="task">
              <div class="check-task">
                <input type="checkbox" :id="'task-view-' + currentTask.id" hidden :checked="currentTask.status === 'completed'"
                  @change="toggleTaskStatus(currentTask)" />
                <label class="checkbox" :for="'task-view-' + currentTask.id">
                  <span class="check">
                    <img src="@/assets/images/check.svg" alt="" />
                  </span>
                </label>
              </div>
              <div class="info-task">
                <label class="title-task">{{ currentTask.title }}</label>
                <p class="description-task">{{ currentTask.description }}</p>
                <div class="subtask">
                  <label class="title">Subtarefas</label>
                  <div class="list-subtasks">
                    <div v-for="subtaskView in currentTask.subtarefas" :key="subtaskView.id" class="box-subtask">
                      <div class="check-task">
                        <input type="checkbox" :id="'task-view-' + currentTask.id + '-sub-' + subtaskView.id" hidden
                          :checked="subtaskView.status === 'completed'"
                          @change="toggleSubtaskStatus(currentTask, subtaskView)" />
                        <label class="checkbox" :for="'task-view-' + currentTask.id + '-sub-' + subtaskView.id">
                          <span class="check">
                            <img src="@/assets/images/check.svg" alt="" />
                          </span>
                        </label>
                      </div>
                      <label>{{ subtaskView.title }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left">
            <div class="info-task">
              <label class="title">Criado em</label>
              <label class="info">
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 1V5M6 1V5M1 9H19M3 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3Z"
                    stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ formatDate(1, currentTask.created_at) }}
              </label>
            </div>
            <div class="info-task">
              <label class="title">Data de vencimento</label>
              <label :class="{ 'info': 'info', 'date': 'date', 'venc': isTaskVencida(currentTask?.due_date) }">
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 1V5M6 1V5M1 9H19M3 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3Z"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ formatDate(0, currentTask.due_date) }}
              </label>
            </div>
            <div class="info-task">
              <label class="title">Modificado em</label>
              <label class="info">
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 1V5M6 1V5M1 9H19M3 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3Z"
                    stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ formatDate(1, currentTask.updated_at) }}
              </label>
            </div>
            <div class="info-task">
              <label class="title">ID da tarefa</label>
              <label class="info">{{ currentTask.id }}</label>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <header class="header">
      <nav class="navbar">
        <div class="icon">
          <img src="@/assets/images/icon.png" alt="" />
        </div>
        <div class="functions">
          <span @click="createTask(0)" class="function" v-b-tooltip.hover title="Criar tarefa">
            <img src="@/assets/images/add.svg" alt="" />
          </span>
          <span class="function">
            <img src="@/assets/images/help.svg" alt="" />
          </span>
          <span class="function">
            <img src="@/assets/images/alert.svg" alt="" />
          </span>
          <span @click="logout" v-b-tooltip.hover class="user-profile">
            <label for="">L</label>
          </span>
        </div>
      </nav>
    </header>

    <main class="content">
      <section class="sidebar">
        <div @click="load(0)" class="item">
          <img src="@/assets/images/inbox.svg" alt="" />
          <label for="">Entrada</label>
        </div>
        <div @click="load(1)" class="item">
          <img src="@/assets/images/tasks.svg" alt="" />
          <label for="">Tarefas de hoje</label>
        </div>
        <div @click="load(2)" class="item">
          <img src="@/assets/images/warning.svg" alt="" />
          <label for="">Vencidos</label>
        </div>
      </section>
      <section class="base">
        <div class="title">
          <label for="">Entrada</label>
        </div>
        <div class="boxs-tasks">
          <div class="task" v-for="task in listTask" :key="task.id">
            <div class="top-task">
              <div class="check-task">
                <input type="checkbox" :id="'task-' + task.id" hidden :checked="task.status === 'completed'"
                  @change="toggleTaskStatus(task)" />
                <label class="checkbox" :for="'task-' + task.id">
                  <span class="check">
                    <img src="@/assets/images/check.svg" alt="" />
                  </span>
                </label>
              </div>
              <div class="info-task" >
                <label class="title-task" @click="modalView(0, task)" style="cursor: pointer">{{ task.title }}</label>
                <div class="extra-desc">
                  <p class="description-task">
                    {{ task.description }}
                  </p>
                  <div class="functions-task">
                    <span @click="editTask(0, task)" class="function" v-b-tooltip.hover title="Editar tarefa">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.1038 1.66848C13.3158 1.45654 13.5674 1.28843 13.8443 1.17373C14.1212 1.05903 14.418 1 14.7177 1C15.0174 1 15.3142 1.05903 15.5911 1.17373C15.868 1.28843 16.1196 1.45654 16.3315 1.66848C16.5435 1.88041 16.7116 2.13201 16.8263 2.40891C16.941 2.68582 17 2.9826 17 3.28232C17 3.58204 16.941 3.87882 16.8263 4.15573C16.7116 4.43263 16.5435 4.68423 16.3315 4.89617L5.43807 15.7896L1 17L2.21038 12.5619L13.1038 1.66848Z"
                          stroke="#81858E" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span class="function" v-b-tooltip.hover title="Definir vencimento"
                      placeholder="Definir vencimento">
                      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14 1V5M6 1V5M1 9H19M3 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3Z"
                          stroke="#81858E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span @click="deleteTask(task.id)" class="function" v-b-tooltip.hover title="Excluir tarefa">
                      <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1 4.4H2.66667M2.66667 4.4H16M2.66667 4.4V16.3C2.66667 16.7509 2.84226 17.1833 3.15482 17.5021C3.46738 17.8209 3.89131 18 4.33333 18H12.6667C13.1087 18 13.5326 17.8209 13.8452 17.5021C14.1577 17.1833 14.3333 16.7509 14.3333 16.3V4.4M5.16667 4.4V2.7C5.16667 2.24913 5.34226 1.81673 5.65482 1.49792C5.96738 1.17911 6.39131 1 6.83333 1H10.1667C10.6087 1 11.0326 1.17911 11.3452 1.49792C11.6577 1.81673 11.8333 2.24913 11.8333 2.7V4.4M6.83333 8.65V13.75M10.1667 8.65V13.75"
                          stroke="#81858E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="date-count">
                  <div :class="{ 'date': 'date', 'danger': isTaskVencida(task.due_date) }">
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 1V5M6 1V5M1 9H19M3 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3Z"
                        stroke="#D31408" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <label for="">{{ formatDate(0, task.due_date) }}</label>
                  </div>
                  <div class="count"></div>
                </div>
              </div>
            </div>
            <div class="list-tasks">
              <div v-for="subtask in task.subtarefas" :key="subtask.id" class="subtask">
                <div class="check-task">
                  <input type="checkbox" :id="'task-' + task.id + '-sub-' + subtask.id" hidden
                    :checked="subtask.status === 'completed'" @change="toggleSubtaskStatus(task, subtask)" />
                  <label class="checkbox" :for="'task-' + task.id + '-sub-' + subtask.id">
                    <span class="check">
                      <img src="@/assets/images/check.svg" alt="" />
                    </span>
                  </label>
                </div>
                <div class="functions-sub">
                  <label class="title-task" :for="'task-' + task.id + '-sub-' + subtask.id">{{ subtask.title }}</label>
                  <div class="functions-task">
                    <span @click="editSubTask(0, task, subtask)" class="function" v-b-tooltip.hover title="Editar subtarefa">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.1038 1.66848C13.3158 1.45654 13.5674 1.28843 13.8443 1.17373C14.1212 1.05903 14.418 1 14.7177 1C15.0174 1 15.3142 1.05903 15.5911 1.17373C15.868 1.28843 16.1196 1.45654 16.3315 1.66848C16.5435 1.88041 16.7116 2.13201 16.8263 2.40891C16.941 2.68582 17 2.9826 17 3.28232C17 3.58204 16.941 3.87882 16.8263 4.15573C16.7116 4.43263 16.5435 4.68423 16.3315 4.89617L5.43807 15.7896L1 17L2.21038 12.5619L13.1038 1.66848Z"
                          stroke="#81858E" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span @click="deleteSubTask(task.id,subtask.id)" class="function" v-b-tooltip.hover
                      title="Excluir subtarefa">
                      <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1 4.4H2.66667M2.66667 4.4H16M2.66667 4.4V16.3C2.66667 16.7509 2.84226 17.1833 3.15482 17.5021C3.46738 17.8209 3.89131 18 4.33333 18H12.6667C13.1087 18 13.5326 17.8209 13.8452 17.5021C14.1577 17.1833 14.3333 16.7509 14.3333 16.3V4.4M5.16667 4.4V2.7C5.16667 2.24913 5.34226 1.81673 5.65482 1.49792C5.96738 1.17911 6.39131 1 6.83333 1H10.1667C10.6087 1 11.0326 1.17911 11.3452 1.49792C11.6577 1.81673 11.8333 2.24913 11.8333 2.7V4.4M6.83333 8.65V13.75M10.1667 8.65V13.75"
                          stroke="#81858E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!isTaskVencida(task.due_date)" class="add-tasks">
              <span class="btn-add" v-b-modal="'modal-new-subtask'">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8.06306 1V15M1 8H15.1261" stroke="#81858E" stroke-width="1.3" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <label @click="createSubTask(0, task.id)">Criar subtarefa</label>
              </span>
            </div>
          </div>

        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    const user = localStorage.getItem('userLogin');

    if (user == '' || user == null || user == undefined) {
      next('/'); // Redireciona para a página inicial
    } else {
      next(); // Continua para a rota da Dashboard
    }
  },
  data() {
    return {
      userAuth: '',
      showFunctionTask: false,
      currentDate: new Date().toISOString().split('T')[0],
      listTask: [],
      subtarefas: [],
      listViewSubTask: [],
      allTasks: [],
      tasks: '',
      idTask: null,
      tokenTask: '',
      nameTask: '',
      descTask: '',
      vencTask: '',
      createdTask: '',
      updatedTask: '',
      filter: null,
      subTask: null,
      currentFilterTitle: 'Entrada'
    };
  },
  methods: {
    load(filter = 0) {
  
    
      let url = `${this.$apiUrl}tarefas?type=${filter}`;

      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        this.listTask = data;
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
    },

  updateFilterTitle(filter) {
    if (filter === 1) {
      this.currentFilterTitle = 'Tarefas de hoje';
    } else if (filter === 2) {
      this.currentFilterTitle = 'Vencidos';
    } else {
      this.currentFilterTitle = 'Entrada';
    }
  },
  updateLocalStorage(filter, data) {
    const cacheKey = `tasks-${filter}`;
    localStorage.setItem(cacheKey, JSON.stringify(data));
  },



    logout() {
      localStorage.removeItem('userLogin');
      this.$router.push('/login');
    },

    clean() {
      this.idTask = '';
      this.tokenTask = '';
      this.nameTask = '';
      this.descTask = '';
      this.vencTask = '';
      this.createdTask = '';
      this.updatedTask = '';
    },
    showAlert(type, msg) {
      this.$swal({
        text: msg,
        icon: type,
        confirmButtonText: 'Confirmar'
      });

      this.load();
    },
    filteredTasks(type) {
      if (type === 0) {
        this.load();
      } else if (type === 1) {
        const today = new Date().toISOString().slice(0, 10);
        this.allTasks = this.listTask.filter(task => task.due_date === today);
      } else if (type === 2) {
        const today = new Date().toISOString().slice(0, 10);
        this.listTask = this.allTasks.filter(task => task.due_date < today);
      } else {
        this.listTask = this.allTasks;
      }

      this.clean();
    },
    modalNew() {
      this.$refs["modal-new-task"].hide();
    },
    modalSubNew() {
      this.$refs["modal-new-subtask"].hide();
    },
    modalEdit() {
      this.$refs["modal-edit-task"].hide();
    },
    modalSubEdit() {
      this.$refs["modal-edit-subtask"].hide();
    },
    modalView(index, task) {
      if (index === 0) {
        this.currentTask = task;
        this.vencTask = task.due_date;
        this.createdTask = task.created_at;
        this.updatedTask = task.updated_at;
        this.$refs['modal-view-task'].show();
      } else {
        this.$refs['modal-view-task'].hide();
        this.currentTask = null;
      }
    },
    toggleTaskStatus(task) {
      // Sua lógica para alternar o status da tarefa
    },
    toggleSubtaskStatus(task, subtask) {
      // Sua lógica para alternar o status da subtarefa
    },
    // Outros métodos
  


    formatDate(type, date) {
      if (!date) {
        return ''; // Retorna uma string vazia se não houver data ou hora
      }

      const dateFormat = new Date(date);

      if (type == 0) {
        return `${dateFormat.getDate().toString().padStart(2, '0')}/${(dateFormat.getMonth() + 1).toString().padStart(2, '0')}/${dateFormat.getFullYear()}`;
      } else {

        return `${dateFormat.getDate().toString().padStart(2, '0')}/${(dateFormat.getMonth() + 1).toString().padStart(2, '0')}/${dateFormat.getFullYear()} às ${dateFormat.getHours().toString().padStart(2, '0')}:${dateFormat.getMinutes().toString().padStart(2, '0')}`;
      }

    },
    functionTask() {
      this.showFunctionTask = !this.showFunctionTask;
    },

    isTaskVencida(task) {

      const dataAtual = new Date();
      const dataVenc = new Date(task);

      dataAtual.setHours(0, 0, 0, 0);

      return dataAtual > dataVenc;

    },
    copyLink(id, token) {

      const url = `${this.urlHOST}/view/${id}/${token}`

      if (!navigator.clipboard) {
        url.execCommand("copy");
      } else {
        navigator.clipboard.writeText(url);
      }

      this.showAlert('success', 'O link da tarefa foi copiado!');

    },
    async createTask(type) {
      if (type === 0) {
        this.clean();
        this.$refs["modal-new-task"].show();
      } else {
        const data = {
          title: this.nameTask,
          description: this.descTask,
          due_date: this.vencTask,
        };

        try {
          const response = await fetch(this.$apiUrl + "tarefas", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "Authorization": `Bearer ${this.userToken}`, // Adicione o token de autenticação, se necessário
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();
          this.clean();

          if (result.status === 'success') {
            this.modalNew();
          }

          this.showAlert(result.status, result.msg);
        } catch (error) {
          console.error('Error creating task:', error);
          this.showAlert('error', 'An error occurred while creating the task.');
        }
      }
    },
    deleteTask(task) {
      fetch(this.$apiUrl + "tarefas/" + task, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.showAlert(data.status, data.msg);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          this.showAlert('error', 'Failed to delete the task.');
        });
    },

    async editTask(type, task = null) {
      if (type === 0) {
        this.nameTask = task.title;
        this.descTask = task.description;
        this.vencTask = task.due_date;
        this.idTask = task.id;

        this.$refs["modal-edit-task"].show();
      } else {
        const data = {
          title: this.nameTask,
          description: this.descTask,
          due_date: this.vencTask,
        };

        try {
          const response = await fetch(this.$apiUrl + "tarefas/" + this.idTask, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              // "Authorization": `Bearer ${this.userToken}`, // Adicione o token de autenticação, se necessário
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();
          this.clean();
          this.modalEdit();
          this.showAlert(result.status, result.msg);

        } catch (error) {
          console.error('Error editing task:', error);
          this.showAlert('error', 'An error occurred while editing the task.');
        }
      }
    },

    createSubTask(type, task) {
      if (type == 0) {
        // this.clean();
        this.idTask = task;
        this.$refs["modal-new-subtask"].show();
      } else {
        const data = {
          // id_tarefa: this.idTask,
          title: this.nameTask,
          description: this.descTask,
          status: 'pending'
        };
        fetch(this.$apiUrl + `tarefas/${this.idTask}/subtarefas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            this.clean();

            if (data.status === 'success') {
              this.modalSubNew();
            }

            this.showAlert(data.status, data.msg);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    },

    deleteSubTask(task, subtask) {
  fetch(this.$apiUrl + `tarefas/${task}/subtarefas/${subtask}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    this.showAlert(data.status, data.message);
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
},

editSubTask(type, task, subTask) {
  if (type == 0) {
    // Popula os campos do modal de edição com os dados da subtarefa
    this.nameTask = subTask.title;
    this.descTask = subTask.description;
    this.idTask = task.id;
    this.subTask = subTask.id; 

    this.$refs["modal-edit-subtask"].show();
  } else {
    var data = {
      title: this.nameTask,
      description: this.descTask,
      status: 'pending'
    };

    fetch(`${this.$apiUrl}tarefas/${this.idTask}/subtarefas/${this.subTask}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Successfully updated subtask') {
        const taskIndex = this.listTask.findIndex(t => t.id === this.idTask);
        if (taskIndex !== -1) {
          const subTaskIndex = this.listTask[taskIndex].subtarefas.findIndex(st => st.id === this.subTask);
          if (subTaskIndex !== -1) {
            // Atualiza a subtarefa no array
            this.$set(this.listTask[taskIndex].subtarefas, subTaskIndex, data.subtarefa);
          }
        }

        this.clean();
        this.$refs["modal-edit-subtask"].hide();
        this.showAlert('success', data.message);
        // Atualize a lista de subtarefas ou faça qualquer outra ação necessária
      } else {
        this.showAlert('error', data.message);
      }
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
      this.showAlert('error', 'There was a problem with your request');
    });
  }
},



    async toggleTaskStatus(task) {

      const newStatus = task.status === 'completed' ? 'pending' : 'completed';

      try {
        const response = await fetch(this.$apiUrl + `tarefas/${task.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          task.status = newStatus;
        } else {
          console.error('Erro ao atualizar o status da tarefa');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    },
    async toggleSubtaskStatus(task, subtask) {
      const newStatus = subtask.status === 'completed' ? 'pending' : 'completed';

      try {
        const response = await fetch(this.$apiUrl + `tarefas/${task.id}/subtarefas/${subtask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),

        });

        if (response.ok) {
          subtask.status = newStatus;
        } else {
          console.error('Erro ao atualizar o status da subtarefa');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    },
  },
  created() {
    this.urlBase = this.$root.urlBase;
    this.userAuth = localStorage.getItem('userLogin');
    this.load();
  }
};
</script>
