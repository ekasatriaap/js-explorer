<template>
  <div
    class="flex flex-col h-screen w-full bg-gray-50 text-gray-800 overflow-hidden font-sans"
  >
    <!-- Top Header / Navigation Bar -->
    <div
      class="h-14 border-b border-gray-200 bg-white flex items-center px-4 justify-between shrink-0 z-20 shadow-sm relative"
    >
      <div class="flex items-center gap-2">
        <svg
          class="w-6 h-6 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
          ></path>
        </svg>
        <h1 class="font-bold text-gray-700 text-lg tracking-tight">
          JS Explorer
        </h1>
      </div>

      <div class="w-1/3 min-w-[300px]">
        <div class="relative group">
          <svg
            class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            type="text"
            v-model="searchInput"
            @keyup.enter="handleSearch"
            placeholder="Search files and folders... (Press Enter)"
            class="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-md py-1.5 pl-9 pr-3 text-sm outline-none transition-all"
          />
        </div>
      </div>

      <div class="w-[120px] invisible">Padding</div>
      <!-- Balance space -->
    </div>

    <!-- Main Content wrapper -->
    <div class="flex flex-1 overflow-hidden relative">
      <!-- Left Sidebar: 30% -->
      <div
        class="w-[30%] min-w-[250px] max-w-[400px] border-r border-gray-200 bg-white flex flex-col h-full z-10"
      >
        <div
          class="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/80 backdrop-blur sticky top-0"
        >
          <h2
            class="font-semibold text-gray-700 text-sm tracking-wide uppercase"
          >
            Explorer
          </h2>
          <button
            @click="store.loadTree"
            class="p-1 hover:bg-gray-200 rounded text-gray-500 transition-colors"
            title="Refresh"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-2 scrollbar-thin">
          <div
            v-if="store.loadingTree"
            class="flex justify-center items-center h-20 text-gray-400"
          >
            <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                fill="none"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading tree...
          </div>

          <div
            v-else-if="store.folderTree.length === 0"
            class="p-4 text-sm text-gray-500 text-center"
          >
            No folders found.
          </div>

          <!-- Render the recursive tree -->
          <FolderTree v-else :folders="store.folderTree" />
        </div>
      </div>

      <!-- Right Content Area: 70% -->
      <div class="flex-1 bg-white flex flex-col h-full relative">
        <ContentPanel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useExplorerStore } from "../store/explorer";
import FolderTree from "./FolderTree.vue";
import ContentPanel from "./ContentPanel.vue";

const store = useExplorerStore();
const searchInput = ref("");

const handleSearch = () => {
  store.performSearch(searchInput.value);
};

// Sync input if search resets from store directly
watch(
  () => store.searchQuery,
  (newVal) => {
    searchInput.value = newVal;
  },
);

onMounted(() => {
  store.loadTree(); // Initially load folder structure
});
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
