<template>
  <header id="HeaderTodo" class="header">
    <h1 class="header__title">TODO list</h1>
    <span><i class="fas fa-trash" @click="deleteAll"></i></span>
  </header>
</template>

<script>
export default {
  name: "HeaderTodo",
  props: {
    tasks: Array,
    update: Function
  },
  methods: {
    deleteAll: function() { // функция удаления всех заданий (в цыкле удаляет каждый индекс)
      for (let i = 0; i < this.$props.tasks.length; i++)
        this.axios.delete("api/todos/" + this.tasks[i].id).then(response => {
          this.$props.update();
          return response;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__title {
  color: #bebebe;
  font-size: 20px;
  font-weight: 400;
  padding-top: 10px;
}
</style>
