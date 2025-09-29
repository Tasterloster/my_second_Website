<script setup lang="ts">
import BaseButton from "@/BaseButton.vue"
import {BUTTON_LABELS} from "@/assets/ButtonLabels.ts";
import {useTodosStore} from "@/Todos.ts";
import {computed} from "vue";

const store = useTodosStore()
const label = computed(() =>
  store.anyCheckedTodos.value ? BUTTON_LABELS.unselectAll : BUTTON_LABELS.selectAll
)
</script>

<template>
  <BaseButton v-bind="$attrs">
    <template #content>
      {{ label }}
    </template>
  </BaseButton>
</template>
