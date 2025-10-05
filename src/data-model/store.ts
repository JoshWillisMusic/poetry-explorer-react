import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { PoetryExplorerState } from "@/data-model/types.ts";
import { EndpointsSlice } from "@/data-model/endpoints_slice.ts";

export const usePoetryExplorerStore = create<PoetryExplorerState>()(
  immer((...a) => ({
    ...EndpointsSlice(...a),
  })),
);
