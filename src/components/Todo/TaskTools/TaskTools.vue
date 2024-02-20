<template>
  <div :class="$style.icons">
    <SVGEdit v-if="tools?.edit" :class="$style.edit" @click="emit('edit')"/>
    <SVGTrash v-if="tools?.trash" :class="$style.trash" @click="emit('trash')"/>
    <SVGArrowLeft
      v-if="tools?.left && task.status > 1"
      :class="$style.left"
      @click="emit('left')"
    />
    <SVGArrowRight
      v-if="tools?.right && task.status < 3"
      :class="$style.right"
      @click="emit('right')"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Tasks } from "@/ts";

const props = defineProps<{
  task: Tasks,
  tools?: {
    left?: boolean,
    right?: boolean,
    trash?: boolean,
    edit?: boolean
  }
}>();

const emit = defineEmits<{ right: [], left: [], trash: [], edit: [] }>()
</script>

<style lang="scss" module src="./TaskTools.module.scss"></style>
