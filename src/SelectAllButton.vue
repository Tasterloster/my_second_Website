<script setup lang="ts">
import BaseButton from "@/BaseButton.vue"
import {BUTTON_LABELS} from "@/assets/ButtonLabels.ts";
import {useTodosStore} from "@/Todos.ts";

const store = useTodosStore()
</script>

<template>
  <BaseButton v-bind="$attrs">
  <template #content>
    {{ store.anyCheckedTodos ? BUTTON_LABELS.selectAll : BUTTON_LABELS.unselectAll }}
  </template>
  </BaseButton>
</template>
