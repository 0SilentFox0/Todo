<template>
  <div id="todo" class="container">
    <div class="row" style="background: #f3f3f3;">
      <div class="col">
        <HeaderTodo :update="updateData" :tasks="tasks" />
      </div>
    </div>
    <div class="row list">
      <div class="col">
        <ListTodo :update="updateData" :tasks="tasks" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <AddTodo :update="this.updateData" :tasks="tasks" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTodo from "../components/HeaderTodo"; // Хедер приложения
import ListTodo from "../components/ListTodo"; // Список всех заданий
import AddTodo from "../components/AddTodo"; // Добавить новое задание
export default {
  name: "Todo",
  components: { ListTodo, HeaderTodo, AddTodo },
  data() {
    return {
      tasks: []
    };
  },
  created() {
    // Первый рендер всех тасков, на случай если до этого уже были добалены
    this.updateData();
  },
  methods: {
    updateData: function() {
      // Функция которя отпраляет get запрос для получения октуального сриска тасков
      this.axios.get("api/todos/").then(response => {
        this.tasks = response.data;
      });
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
</style>
