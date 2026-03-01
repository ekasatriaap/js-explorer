<template>
  <div class="folder-tree w-full">
    <FolderItem
      v-for="folder in folders"
      :key="folder.id"
      :folder="folder"
      :depth="depth"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Folder } from "../store/explorer";
import FolderItem from "./FolderItem.vue";

defineProps({
  folders: {
    type: Array as PropType<Folder[]>,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
});
</script>
