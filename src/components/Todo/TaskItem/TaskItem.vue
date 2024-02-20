<template>
  <div v-if="task" :class="$style.container">
    <p v-if="!isEdit && !isLoading" :class="$style.title">{{ task?.title }}</p>

    <form v-else-if="!isLoading" :class="$style.form" @submit.prevent="updateTitle(editInput, task?.id)">
      <UIInput v-model="editInput" :class="$style.input" :placeholder="'Введите текст'"/>
      <button :class="$style.submitButton" type="submit">
        <SVGCheck/>
      </button>
    </form>

    <UILoader v-else :is-loading="isLoading" />

    <div :class="$style.icons">
      <SVGEdit :class="$style.edit" @click="openEditForm(task?.title)"/>
      <SVGTrash @click="deleteTask(task?.id)" :class="$style.trash"/>
      <SVGArrowLeft
        v-if="task.status > 1"
        :class="$style.left"
        @click="back(task?.status, task?.id)"
      />
      <SVGArrowRight
        v-if="task.status < 3"
        :class="$style.right"
        @click="forward(task?.status, task?.id)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {Tasks} from "@/ts";

const props = defineProps<{
  task?: Tasks
}>()

const isEdit = ref(false);
const isLoading = ref(false)
const editInput = ref('')

const {refresh} = useAsyncData('todo', async () => (
  await $api.todo.getList()
))

function openEditForm(title: string) {
  isEdit.value = !isEdit.value
  return editInput.value = title
}

async function forward(currentStatus: number, id: string) {
  isLoading.value = true
  const response = await $api.todo.updateStatus(currentStatus + 1, id)
  if (response?.id) {
    return refresh()
  }
  isLoading.value = false
}

async function back(currentStatus: number, id: string) {
  isLoading.value = true
  const response = await $api.todo.updateStatus(currentStatus - 1, id)
  if (response?.id) {
    return refresh()
  }
  isLoading.value = false
}

async function updateTitle(title: string, id: string) {
  isLoading.value = true
  const response = await $api.todo.updateTitle(title, id)
  if (response?.id) {
    isEdit.value = !isEdit.value
    isLoading.value = false
    return refresh()
  }
  isLoading.value = false
}

async function deleteTask(id: string) {
  isLoading.value = true
  const response = await $api.todo.deleteTask(id)

  if (response?.id) {
    return refresh()
  }

  isLoading.value = false
}
</script>

<style lang="scss" module src="./TaskItem.module.scss"></style>
