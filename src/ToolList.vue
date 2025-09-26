<script setup lang="ts">

import TodoDeleteButton from "@/TodoDeleteButton.vue";
import SelectAllButton from "@/SelectAllButton.vue";
import SaveButton from "@/SaveButton.vue";
import UndoDeleteButton from "@/UndoDeleteButton.vue";
</script>

<template>
  <div class ="container">
    <SelectAllButton
    />
    <TodoDeleteButton
    />
    <SaveButton
    />
    <UndoDeleteButton
    />
  </div>
</template>

<style scoped>
.container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: .5em 0 .5em 0;
  gap: .5em;
}
</style>