<script setup lang="ts">

</script>

<template>
  <div class="listItem">
    <div class="prefix">
      <slot name="prefix"></slot>
    </div>
    <div class="content">
      <slot name="content" class="contentText"></slot>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
    <div class="inputContainer">
      <slot name="inputContainer"></slot>
    </div>
  </div>
</template>

<style scoped>

.listItem {
  display: grid;
  grid-template-columns: auto 1fr auto; /* links | mitte (flex) | rechts */
  grid-template-rows: auto auto;       /* Zeile 1: Content, Zeile 2: Editor */
  column-gap: .5rem;
  row-gap: .5rem;
  padding: .5rem;
  box-sizing: border-box;
  background: whitesmoke;
  border: 2px solid lightgray;
  border-radius: 6px;
  max-width: 75vw;
  min-width: 50vw;
}

.prefix{
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: flex-start;
}

.actions{
  grid-column: 3;
  grid-row: 1 / span 2;       /* über Content + Editor */
  align-self: center;         /* vertikal mittig in der gesamten Item-Höhe */
  display: flex;
  gap: .5rem;
}

.inputContainer {
  grid-column: 2;
  grid-row: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .5rem;
  min-width: 0;
}

.contentText {
  min-width: 0;
  max-width: 100%;
  overflow-wrap: break-word;
  white-space: normal;
  word-break: break-word;
}

.content {
  grid-column: 2;
  grid-row: 1;
  min-width: 0;               /* wichtig für korrektes Umbrechen */
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}
</style>