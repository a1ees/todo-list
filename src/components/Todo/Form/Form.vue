<template>
      <form @submit.prevent="submit">
        <UIInput v-model="taskInput" :class="$style.input" :placeholder="'What needs to be done?'"/>
        <UIButton :class="$style.button" :disabled="!taskInput.length">
          ADD TODO
        </UIButton>
      </form>
</template>

<script lang="ts" setup>
const taskInput = ref('');

const { refresh } = useAsyncData('todo', async () => (
  await $api.todo.getList()
))

async function submit() {

  const response = await $api.todo.addTask(taskInput.value)

  if (response?.id) {
    taskInput.value = ''
    return refresh()
  }

  return console.error('Произошла ошибка при отправке данных')
}
</script>

<style lang="scss" module src="./Form.module.scss"></style>
