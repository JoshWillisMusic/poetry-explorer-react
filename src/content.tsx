import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import PoemDisplay from "@/display.tsx";
import SearchResults from "@/results.tsx";
import cn from "classnames";
import { use } from "react";
import { usePoetryExplorerStore } from "@/data-model/store.ts";

export const Content = () => {
  const poem = usePoetryExplorerStore((state) => state.poem);
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-dvw h-[calc(100vh_-_2rem)] mt-12"
    >
      <ResizablePanel defaultSize={50}>
        <SearchResults />
      </ResizablePanel>
      <ResizableHandle withHandle={true} />
      <ResizablePanel defaultSize={50}>
        <PoemDisplay poem={poem.data} status={poem.status} />
        <svg style={{ display: "none" }} width="0" height="0" version="1.1">
          <filter id="wavy2">
            <feTurbulence
              x="0"
              y="0"
              baseFrequency="0.03"
              numOctaves="4"
              seed="1"
            ></feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
        </svg>
        <div className="parchment"></div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
