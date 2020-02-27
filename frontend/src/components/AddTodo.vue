<template>
  <div id="AddTodo" class="d-flex align-items-center">
    <label for="todo-add">
      <i class="fas fa-plus" @click="addTodo()"></i>
    </label>
    <input
      id="todo-add"
      class="todo-add"
      type="text"
      v-model="todoText"
      @keypress.enter="addTodo()"
      :class="{ error: todoError }"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  props: {
    tasks: Array, // Через пропсы принимаю актуальный список заданий и функция для перерисовки
    update: Function
  },
  data() {
    return {
      todoText: "",
      placeholder: "Put your task", // плейсхолдер будет изменяться в случае ошибки
      todoError: false
    };
  },
  methods: {
    addTodo: function() {
      // Функция добавления нового задания, в случае успеха отправит post запрос, в случе ошибки инпут будет красным и ничего не отправит
      if (this.todoText) {
        this.axios
          .post("api/todos/", {
            id: this.$props.tasks.length + 1,
            title: this.todoText,
            completed: false
          })
          .then(response => {
            this.$props.update();
            return response;
          });
        this.todoText = "";
        this.todoError = false;
        this.placeholder = "Put your task";
      } else {
        this.todoError = true;
        this.placeholder = "Error!";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-add {
  width: 100%;
  height: 30px;
  padding-left: 10px;
  margin: 50px 0 10px 10px;
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  background: #f2f5f3;
  &:focus {
    outline: none;
  }
}

label {
  margin-top: 45px;
}

.error {
  border-color: red;
  &::placeholder {
    color: red;
  }
}
</style>
