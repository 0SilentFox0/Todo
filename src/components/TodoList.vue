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
      todos: [
        {
          id: 1,
          title:
            "Go to Market asasdokas'pfjs fkdsfksdlg'gaj'dk jas'gjadf'kgajs'grwegwetgqe efqefkqegkqegekgae'rker",
          completed: true
        },
        {
          id: 2,
          title: "Study",
          completed: false
        },
        {
          id: 3,
          title: "Sally's books",
          completed: true
        },
        {
          id: 4,
          title: "Article",
          completed: false
        }
      ]
    };
  },
  methods: {
    addTodo: function() {
      this.axios
        .get("/api/todos/")
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      // var data = {
      //   id: this.todos.length + 1,
      //   title: this.todoText,
      //   completed: false
      // };
      // console.log(data.id);
      // if (this.todoText) {
      //   this.todos.push(data);
      //   this.todoText = "";
      //   this.todoError = false;
      //   this.placeholder = "Put your task";
      // } else {
      //   this.todoError = true;
      //   this.placeholder = "Error!";
      // }
    },
    deleteTodo: function(id) {
      this.todos = this.todos.filter(t => t.id !== id);
      console.log(this.todos.length);
    },
    changeStatusTodo: function(todo) {
      todo.completed = !todo.completed;
      console.log(todo.id);
    },
    deleteAll: function() {
      this.todos = [];
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
  background: transparent;
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
