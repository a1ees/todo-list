<template>
    <div :class="$style.todo">
      <TodoForm :class="$style.todoForm" />
      <div :class="$style.todoContainer">
        <div
          v-for="column in todoColumns"
          :key="column.status"
          :class="$style.column"
        >
          <TodoColumn v-if="todo" :column="column" :tasks="todo"/>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
const { data: todo } = useAsyncData('todo', async () => (
  await $api.todo.getList()
))

const todoColumns = ref([
  {
    title: "New",
    status: 1
  },
  {
    title: "In Progress",
    status: 2
  },
  {
    title: "Completed",
    status: 3
  }]);

</script>

<style lang="scss" module src="./Section.module.scss"></style>
