<script setup lang="ts">
  import DeleteButton from "@/DeleteButton.vue";
  import EditButton from "@/EditButton.vue";
  defineProps<{ todo_item_name: string }>();
</script>

<template>
<div class="container">
  <input type="checkbox"></input>
  <span> {{ todo_item_name}} </span>
  <DeleteButton></DeleteButton>
  <EditButton></EditButton>
</div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    gap: .5em;
  }
</style>