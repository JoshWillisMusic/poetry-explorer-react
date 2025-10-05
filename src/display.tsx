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
import { usePoetryExplorerStore } from "@/data-model/store.ts";

interface PoemDisplayProps {
  poem: Poem;
}
const PoemDisplay = () => {
  const selectedPoem = usePoetryExplorerStore((state) => state.selectedPoem);

  return (
    <div className={"flex flex-col content-center pr-2.5 relative"}>
      <div> </div>
      <div className={"flex flex-col gap-4"}>
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
      </div>
    </div>
  );
};
export default PoemDisplay;
