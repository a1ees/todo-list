<template>
  <div v-if="task" :class="$style.container">
    <p v-if="!isEdit && !isLoading" :class="$style.title">{{ task?.title }}</p>

    <form v-else-if="!isLoading" :class="$style.form" @submit.prevent="updateTitle(editInput, task?.id)">
      <UIInput v-model="editInput" :class="$style.input" :placeholder="'Введите текст'"/>
      <button :class="$style.submitButton" type="submit">
        <SVGCheck/>
      </button>
    </form>

    <UILoader v-else :is-loading="isLoading"/>
    <TaskTools
      :task="task"
      :tools="{ edit: true, trash: true, left: true, right: true }"
      @edit="openEditForm(task?.title)"
      @left="updateStatus(task?.status, task?.id, -1)"
      @right="updateStatus(task?.status, task?.id, 1)"
      @trash="deleteTask(task?.id)"
    />
    <div :class="$style.createAt">{{ relativeCreationTime }}</div>
  </div>
</template>

<script lang="ts" setup>
import type {Tasks} from "@/ts";
import TaskTools from "@/components/Todo/TaskTools/TaskTools.vue";

const props = defineProps<{
  task?: Tasks
}>()

const isEdit = ref(false);
const isLoading = ref(false)
const editInput = ref('')
const relativeCreationTime = ref('Дата создания не определена');

const {refresh} = useAsyncData('todo', async () => (
  await $api.todo.getList()
))
const updateRelativeCreationTime = () => {

  const dateOptions = {
    locale: 'ru',
    options: {numeric: 'auto', style: 'short'},
  };

  const createdAt = props.task?.createAt;
  if (!createdAt) {
    relativeCreationTime.value = 'Дата создания не определена';
  } else {
    relativeCreationTime.value = $utils.date.getRelativeDate(createdAt, 'days', dateOptions);
  }
};

onMounted(() => {
  updateRelativeCreationTime();
  const interval = setInterval(updateRelativeCreationTime, 1000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});

function openEditForm(title: string) {
  isEdit.value = !isEdit.value
  return editInput.value = title
}

async function updateStatus(currentStatus: number, id: string, direction: number) {
  isLoading.value = true;
  try {
    const newStatus = currentStatus + direction;
    const response = await $api.todo.updateStatus(newStatus, id);

    if (response?.id) {
      return refresh();
    }
  } catch (error) {
    console.error("Ошибка при обновлении статуса: ", error);
  } finally {
    isLoading.value = false;
  }
}

async function updateTitle(title: string, id: string) {
  isLoading.value = true;
  try {
    const response = await $api.todo.updateTitle(title, id);

    if (response?.id) {
      await refresh();
      return isEdit.value = !isEdit.value;
    }
  } catch (error) {
    console.error("Ошибка при обновлении заголовка: ", error);
  } finally {
    isLoading.value = false;
  }
}

async function deleteTask(id: string) {
  isLoading.value = true;
  try {
    const response = await $api.todo.deleteTask(id);

    if (response?.id) {
      return refresh();
    }
  } catch (error) {
    console.error("Ошибка при удалении задачи: ", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" module src="./TaskItem.module.scss"></style>
