<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="listItem">
      <slot name="prefix"></slot>
      <slot name="content" class="todoText"></slot>
      <slot name="actions"></slot>
    </div>
    <div class="inputField">
      <slot name="inputField"></slot>
    </div>
  </div>
</template>

<style scoped>
.container{
  max-width: 75vw;
  min-width: 50vw;
}
.listItem {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  padding: .5em .5em .5em .5em;
  text-overflow: ellipsis;
}

.inputField{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: .5em 0;
  gap: .5em;
  box-sizing: border-box;
}

.todoText{
  display: block;
  max-width: min(35vw, 100%);
  overflow-wrap: break-word;
  white-space: normal;
}

</style>