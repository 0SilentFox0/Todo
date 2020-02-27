<template>
  <div id="todo" class="container">
    <div class="row">
      <div class="col title">
        <h1 class="title__text">TODO list</h1>
        <span><i class="fas fa-trash" @click="deleteAll"></i></span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ul>
          <li v-for="todo in todos" :key="todo.id">
            <div class="d-flex">
              <span v-if="todo.completed" @click="changeStatusTodo(todo)">
                <i class="far fa-check-circle"></i>
              </span>
              <span v-else @click="changeStatusTodo(todo)">
                <i class="far fa-circle"></i>
              </span>
              <p class="task__text" :class="{ done: todo.completed }">
                {{ todo.title }}
              </p>
            </div>
            <span>
              <i class="fas fa-trash" @click="deleteTodo(todo.id)"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex align-items-center">
        <label for="todo-add"
          ><i class="fas fa-plus" @click="addTodo()"></i
        ></label>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      todoText: "",
      todoError: false,
      placeholder: "Put your task",
      todos: []
    };
  },
  created() {
    this.updateData();
  },
  methods: {
    updateData: function() {
      this.axios.get("api/todos/").then(response => {
        this.todos = response.data;
      });
    },
    addTodo: function() {
      if (this.todoText) {
        this.axios
          .post("api/todos/", {
            id: this.todos.length + 1,
            title: this.todoText,
            completed: false
          })
          .then(response => {
            this.updateData();
            return response;
          });
        this.todoText = "";
        this.todoError = false;
        this.placeholder = "Put your task";
      } else {
        this.todoError = true;
        this.placeholder = "Error!";
      }
    },
    deleteTodo: function(id) {
      this.axios.delete("api/todos/" + id).then(response => {
        this.updateData();
        return response;
      });
    },
    changeStatusTodo: function(todo) {
      this.axios
        .patch("api/todos/" + todo.id + "/", {
          completed: !todo.completed
        })
        .then(response => {
          this.updateData();
          return response;
        });
    },
    deleteAll: function() {
      for (let i = 0; i < this.todos.length; i++)
        this.deleteTodo(this.todos[i].id);
    }
  }
};
</script>

<style lang="scss" scoped>
#todo {
  margin-top: 50px;
  font-family: "Roboto Thin", sans-serif;
  border: 1px solid #f3f3f3;
}
.title {
  padding-right: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f3;
}
.title__text {
  color: #bebebe;
  font-size: 20px;
  font-weight: 400;
  padding-top: 10px;
}
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

.error {
  border-color: red;
  &::placeholder {
    color: red;
  }
}
</style>
