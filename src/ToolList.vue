<script setup lang="ts">
import DeleteButton from "@/DeleteButton.vue";
import SelectAllButton from "@/SelectAllButton.vue";
import DownloadButton from "@/DownloadButton.vue";
import UndoDeleteButton from "@/UndoDeleteButton.vue";
import {useTodosStore} from "@/Todos.ts";
import {saveWithBackupFiles} from "@/TodosIO.ts";
import BaseButton from "@/BaseButton.vue";
import {BUTTON_LABELS} from "@/assets/ButtonLabels.ts";

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
    <BaseButton @click="store.importAll()" #content>
      {{BUTTON_LABELS.upload}}
    </BaseButton>
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