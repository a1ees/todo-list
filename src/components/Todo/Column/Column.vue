<template>
  <h3 :class="$style.title">{{ column?.title }}</h3>
  <TodoTaskItem
    v-for="task in filteredTasks(<number>column?.status)"
    :key="task.title"
    :task="task"
  />
</template>

<script lang="ts" setup>

import type {TodoColumn, Tasks} from "@/ts";

const props = defineProps<{
  column?: TodoColumn
  tasks?: Tasks[] | null
}>()

const filteredTasks = (columnStatus: number) => {
  if (props.tasks) {
    return props.tasks.filter(task => task.status === columnStatus);
  }
  return [];
}

</script>

<style lang="scss" module src="./Column.module.scss"></style>
