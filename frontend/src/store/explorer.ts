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
  const { fetchFolderTree, fetchFolderContents } = useExplorer();

  const folderTree = ref<Folder[]>([]);
  const activeFolderId = ref<string | null>(null);

  // Storage for the right panel
  const activeContents = ref<{ folders: Folder[]; files: File[] }>({
    folders: [],
    files: [],
  });

  const loadingTree = ref(false);
  const loadingContents = ref(false);

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

  return {
    folderTree,
    activeFolderId,
    activeContents,
    loadingTree,
    loadingContents,
    loadTree,
    selectFolder,
  };
});
