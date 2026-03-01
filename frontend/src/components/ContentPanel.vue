<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Breadcrumb / Toolbar -->
    <div
      class="px-6 py-3 border-b border-gray-100 flex items-center bg-white sticky top-0 z-10"
    >
      <div class="flex items-center text-sm">
        <svg
          class="w-5 h-5 text-gray-400 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          ></path>
        </svg>
        <span
          class="text-gray-500 font-medium cursor-pointer hover:text-blue-600 transition-colors"
          @click="resetToHome"
          >This Desktop</span
        >

        <!-- Search Breadcrumb -->
        <template v-if="store.isSearching">
          <span class="mx-2 text-gray-300">/</span>
          <span class="text-gray-800 font-semibold"
            >Search Results for "{{ store.searchQuery }}"</span
          >
        </template>

        <!-- Folder Breadcrumb -->
        <template v-else>
          <span v-if="store.activeFolderId" class="mx-2 text-gray-300">/</span>
          <span
            v-if="store.activeFolderId"
            class="text-gray-800 font-semibold"
            >{{ currentFolderName }}</span
          >
        </template>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-y-auto p-6">
      <div
        v-if="store.loadingContents"
        class="h-full w-full flex items-center justify-center"
      >
        <div class="flex flex-col items-center text-blue-500">
          <svg class="animate-spin h-8 w-8 mb-4" viewBox="0 0 24 24">
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
          <span class="text-gray-500 font-medium">Loading contents...</span>
        </div>
      </div>

      <div
        v-else-if="!store.activeFolderId && !store.isSearching"
        class="h-full w-full flex flex-col items-center justify-center text-gray-400"
      >
        <svg
          class="w-16 h-16 mb-4 text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
          ></path>
        </svg>
        <p class="text-lg font-medium text-gray-500">
          Select a folder to view its contents
        </p>
      </div>

      <div
        v-else-if="isEmpty"
        class="h-full w-full flex flex-col items-center justify-center text-gray-400"
      >
        <p v-if="store.isSearching" class="text-lg font-medium text-gray-500">
          No results found for "{{ store.searchQuery }}".
        </p>
        <p v-else class="text-lg font-medium text-gray-500">
          This folder is empty.
        </p>
      </div>

      <!-- Grid View -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
        <!-- Folders -->
        <div
          v-for="folder in store.activeContents.folders"
          :key="folder.id"
          class="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-blue-50 cursor-pointer transition-all border border-transparent hover:border-blue-100 group"
          @click="store.selectFolder(folder.id)"
        >
          <svg
            class="w-16 h-16 text-blue-400 mb-3 group-hover:scale-105 transition-transform"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            ></path>
          </svg>
          <span
            class="text-sm font-medium text-gray-700 text-center truncate w-full group-hover:text-blue-700"
            :title="folder.name"
            >{{ folder.name }}</span
          >
        </div>

        <!-- Files -->
        <div
          v-for="file in store.activeContents.files"
          :key="file.id"
          class="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-all border border-transparent hover:border-gray-200 group"
        >
          <div
            class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform"
          >
            <span class="text-xs font-bold text-gray-400 uppercase">{{
              file.extension
            }}</span>
          </div>
          <span
            class="text-sm font-medium text-gray-600 text-center truncate w-full"
            :title="file.name"
            >{{ file.name }}</span
          >
          <span class="text-xs text-gray-400 mt-1">{{
            formatBytes(file.size)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useExplorerStore } from "../store/explorer";

const store = useExplorerStore();

const resetToHome = () => {
  store.performSearch(""); // Empty search resets everything
};

const isEmpty = computed(() => {
  return (
    store.activeContents.folders.length === 0 &&
    store.activeContents.files.length === 0
  );
});

const currentFolderName = computed(() => {
  // A simple heuristic, since we are fetching from Tree we can find it.
  if (!store.activeFolderId) return "";
  const findFolderRec = (folders: any[], id: string): string | null => {
    for (const f of folders) {
      if (f.id === id) return f.name;
      if (f.children) {
        const found = findFolderRec(f.children, id);
        if (found) return found;
      }
    }
    return null;
  };
  return (
    findFolderRec(store.folderTree, store.activeFolderId) || "Unknown Folder"
  );
});

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
</script>
