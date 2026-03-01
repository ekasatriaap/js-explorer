<template>
  <div class="folder-item select-none text-sm">
    <div
      class="flex items-center px-1 py-1.5 cursor-pointer hover:bg-blue-50 transition-colors group"
      :class="{
        'bg-blue-100 text-blue-700 font-medium':
          store.activeFolderId === folder.id,
      }"
      :style="{ paddingLeft: `${depth * 16 + 8}px` }"
      @click="selectThisFolder"
    >
      <!-- Expand/Collapse Chevron -->
      <div
        class="w-5 h-5 flex items-center justify-center mr-1 text-gray-400 group-hover:text-gray-600 transition-colors"
        @click.stop="toggleOpen"
      >
        <svg
          v-if="hasChildren && isOpen"
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
        <svg
          v-else-if="hasChildren && !isOpen"
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </div>

      <!-- Folder Icon -->
      <svg
        class="w-5 h-5 mr-2 text-blue-400"
        :class="{ 'text-blue-500': store.activeFolderId === folder.id }"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
        ></path>
      </svg>

      <!-- Folder Name -->
      <span class="truncate">{{ folder.name }}</span>
    </div>

    <!-- Render children recursively -->
    <div v-show="isOpen && hasChildren">
      <FolderTree :folders="folder.children" :depth="depth + 1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from "vue";
import { Folder, useExplorerStore } from "../store/explorer";
import FolderTree from "./FolderTree.vue";

const props = defineProps({
  folder: {
    type: Object as PropType<Folder>,
    required: true,
  },
  depth: {
    type: Number,
    required: true,
  },
});

const store = useExplorerStore();
const isOpen = ref(false);

const hasChildren = computed(() => {
  return props.folder.children && props.folder.children.length > 0;
});

const toggleOpen = () => {
  if (hasChildren.value) {
    isOpen.value = !isOpen.value;
  }
};

const selectThisFolder = () => {
  store.selectFolder(props.folder.id);
  // Auto open folder when clicked on name
  if (hasChildren.value && !isOpen.value) {
    isOpen.value = true;
  }
};
</script>
