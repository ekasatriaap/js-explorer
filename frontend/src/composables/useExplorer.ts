import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
});

export function useExplorer() {
  const fetchFolderTree = async () => {
    const response = await api.get("/folders/tree");
    return response.data.data;
  };

  const fetchFolderContents = async (folderId: string) => {
    const response = await api.get(`/folders/${folderId}/contents`);
    return response.data.data;
  };

  const search = async (query: string) => {
    const response = await api.get(`/search`, { params: { q: query } });
    return response.data.data;
  };

  return {
    fetchFolderTree,
    fetchFolderContents,
    search,
  };
}
