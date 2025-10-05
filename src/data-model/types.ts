import type {
  EndpointsActions,
  EndpointsState,
} from "@/data-model/endpoints_slice.ts";

export type PoetryExplorerState = EndpointsState & EndpointsActions;

export type PoemData = {
  title: string;
  author: string;
  lines?: string;
  linecount?: number;
};
