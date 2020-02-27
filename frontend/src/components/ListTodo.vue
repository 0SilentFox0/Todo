<template>
  <div id="ListTodo">
    <ul>
      <li v-for="task in this.$props.tasks" :key="task.id">
        <div class="d-flex">
          <span v-if="task.completed" @click="changeStatusTodo(task)">
            <i class="far fa-check-circle"></i>
          </span>
          <span v-else @click="changeStatusTodo(task)">
            <i class="far fa-circle"></i>
          </span>
          <p class="task__text" :class="{ done: task.completed }">
            {{ task.title }}
          </p>
        </div>
        <span>
          <i class="fas fa-trash" @click="deleteTodo(task.id)"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ListTodo",
  props: {
    update: Function,
    tasks: Array
  },
  methods: {
    deleteTodo: function(id) { // функция удаления одного конкретного задания
      this.axios.delete("api/todos/" + id).then(response => {
        this.$props.update();
        return response;
      });
    },
    changeStatusTodo: function(task) { // функция для изменения статуса Сделано/Нет
      this.axios
        .patch("api/todos/" + task.id + "/", {
          completed: !task.completed
        })
        .then(response => {
          this.$props.update();
          return response;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.task__text {
  padding-left: 10px;
}

.done {
  font-style: italic;
}

ul {
  padding: 10px;
}

li {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  list-style-type: none;
  }

li {
  .fa-trash {
    color: white;
  }
  &:hover {
    .fa-trash {
      color: black;
    }
  }
}
</style>
