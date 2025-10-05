import type { StateCreator } from "zustand/vanilla";
import type { PoemData, PoetryExplorerState } from "@/data-model/types.ts";

export type RestStatus = "loading" | "success" | "error" | "idle";
const url = "https://poetrydb.org";

export interface EndpointsState {
  searchResults: { status: RestStatus; data: PoemData[] };
  poem: { status: RestStatus; data: PoemData };
  error: string;
}
export interface EndpointsActions {
  search: (searchTerm: string, searchBy: "author" | "title") => void;
  getPoem: (authorName: string, title: string) => void;
}

const initialState: EndpointsState = {
  searchResults: { status: "idle", data: [] },
  poem: { status: "idle", data: { title: "", author: "" } },
  error: "",
};

export const EndpointsSlice: StateCreator<
  PoetryExplorerState,
  [["zustand/immer", never]],
  [],
  EndpointsState & EndpointsActions
> = (set) => ({
  ...initialState,
  search: async (searchTerm, searchBy) => {
    set((state) => {
      state.searchResults.status = "loading";
    });
    try {
      let searchResults = [];
      if (searchBy === "author") {
        searchResults = await searchByAuthor(searchTerm);
      } else {
        searchResults = await searchByTitle(searchTerm);
      }
      if (Array.isArray(searchResults)) {
        set({ searchResults: { status: "success", data: searchResults } });
      } else {
        set({
          searchResults: { status: "error", data: [] },
          error: searchResults.status.toString() + searchResults.reason,
        });
      }
    } catch (e) {
      set({ searchResults: { status: "error", data: [] }, error: e.message });
    }
  },
  getPoem: async (authorName, title) => {
    set((state) => {
      state.poem.status = "loading";
    });
    try {
      const poem = await fetchPoem(authorName, title);
      set({ poem: { status: "success", data: poem[0] } });
    } catch (e) {
      set((state) => {
        state.poem.status = "error";
      });
    }
  },
});

export const searchByAuthor = async (authorName: string) => {
  const searchUrl = `${url}/author/${authorName}/title,author,linecount`;
  const response = await fetch(searchUrl, {
    method: "GET",
  });
  return response.json();
};

export const searchByTitle = async (title: string) => {
  const searchUrl = `${url}/title/${title}/title,author,linecount`;
  const response = await fetch(searchUrl, {
    method: "GET",
  });
  return response.json();
};

export const fetchPoem = async (authorName: string, title: string) => {
  const searchUrl = `${url}/author,title/${authorName};${title}`;
  const response = await fetch(searchUrl, {
    method: "GET",
  });
  return response.json();
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
