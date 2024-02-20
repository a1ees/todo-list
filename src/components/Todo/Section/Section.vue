<template>
  <div v-if="typeof todo !== 'string'" :class="$style.todo">
    <TodoForm :class="$style.todoForm"/>
    <div :class="$style.todoContainer">
      <div
        v-for="column in todoColumns"
        :key="column.status"
        :class="$style.column"
      >
        <TodoColumn :column="column" :tasks="todo"/>
      </div>
    </div>
  </div>
  <ModalAlert
    v-else
    :title="'Превышен лимит запросов на сервер'"
    :visible="true"
    @hide="refresh"/>
</template>

<script lang="ts" setup>

const {data: todo, refresh} = useAsyncData('todo', async () => (
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
