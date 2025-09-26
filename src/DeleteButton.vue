<script setup lang="ts">
import BaseButton from "@/BaseButton.vue"
import {BUTTON_LABELS} from "@/assets/ButtonLabels.ts";

</script>

<template>
  <BaseButton v-bind="$attrs"
    #content>{{ BUTTON_LABELS.delete }}
  </BaseButton>
</template>
