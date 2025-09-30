<script setup lang="ts">
import DeleteButton from "@/DeleteButton.vue";
import SelectAllButton from "@/SelectAllButton.vue";
import DownloadButton from "@/DownloadButton.vue";
import UndoDeleteButton from "@/UndoDeleteButton.vue";
import {useTodosStore} from "@/Todos.ts";
import {saveWithBackupFiles} from "@/TodosIO.ts";

const store = useTodosStore()
</script>

<template>
  <div class ="container">
    <SelectAllButton @click="store.toggleAll()"
    />
    <DeleteButton @click="store.deleteAll()"
    />
    <DownloadButton @click="store.saveAll()"
    />
    <UndoDeleteButton @click="store.restoreAll()"
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