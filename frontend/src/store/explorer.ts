import { defineStore } from "pinia";
import { ref } from "vue";
import { useExplorer } from "../composables/useExplorer";

export interface Folder {
  id: string;
  name: string;
  parent_id: string | null;
  children: Folder[];
  created_at: string;
  updated_at: string;
}

export interface File {
  id: string;
  name: string;
  extension: string;
  size: number;
  folder_id: string;
  created_at: string;
  updated_at: string;
}

export const useExplorerStore = defineStore("explorer", () => {
  const { fetchFolderTree, fetchFolderContents, search } = useExplorer();

  const folderTree = ref<Folder[]>([]);
  const activeFolderId = ref<string | null>(null);

  // Storage for the right panel
  const activeContents = ref<{ folders: Folder[]; files: File[] }>({
    folders: [],
    files: [],
  });

  const loadingTree = ref(false);
  const loadingContents = ref(false);

  const isSearching = ref(false);
  const searchQuery = ref("");

  const loadTree = async () => {
    loadingTree.value = true;
    try {
      folderTree.value = await fetchFolderTree();
    } catch (error) {
      console.error("Failed to fetch folder tree:", error);
    } finally {
      loadingTree.value = false;
    }
  };

  const selectFolder = async (folderId: string) => {
    isSearching.value = false;
    searchQuery.value = "";
    activeFolderId.value = folderId;
    loadingContents.value = true;
    try {
      activeContents.value = await fetchFolderContents(folderId);
    } catch (error) {
      console.error("Failed to fetch folder contents:", error);
    } finally {
      loadingContents.value = false;
    }
  };

  const performSearch = async (query: string) => {
    searchQuery.value = query;
    if (!query.trim()) {
      isSearching.value = false;
      if (activeFolderId.value) {
        await selectFolder(activeFolderId.value);
      } else {
        activeContents.value = { folders: [], files: [] };
      }
      return;
    }

    isSearching.value = true;
    loadingContents.value = true;
    // Clear active folder selection when searching
    activeFolderId.value = null;

    try {
      activeContents.value = await search(query);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    } finally {
      loadingContents.value = false;
    }
  };

  return {
    folderTree,
    activeFolderId,
    activeContents,
    loadingTree,
    loadingContents,
    isSearching,
    searchQuery,
    loadTree,
    selectFolder,
    performSearch,
  };
});
