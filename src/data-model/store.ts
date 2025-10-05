import { create } from "zustand";
import type { PoetryExplorerState } from "@/data-model/types.ts";
import {EndpointsSlice} from "@/data-model/endpoints_slice.ts";

export const usePoetryExplorerStore = create<PoetryExplorerState>()(
  (...a) => ({
    ...EndpointsSlice(...a),
  })
)