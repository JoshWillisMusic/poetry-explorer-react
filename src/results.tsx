import { usePoetryExplorerStore } from "@/data-model/store.ts";
import cn from "classnames";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { PoemData } from "@/data-model/types.ts";
import { useEffect } from "react";
const SearchResults = () => {
  const searchResults = usePoetryExplorerStore((state) => state.searchResults);
  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <div
      className={cn(
        "flex flex-col gap-2 h-[calc(100vh_-_48px)] overflow-y-auto p-2.5",
        {
          "blur-lg": searchResults.status === "loading",
        },
      )}
    >
      {searchResults.status === "success" &&
        (searchResults.data as PoemData[]).map((result) => (
          <Item variant="muted" key={result.author + result.title}>
            <ItemContent>
              <ItemTitle>{result.title}</ItemTitle>
              <ItemDescription>
                {result.author} - {result.linecount} lines
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Preview
              </Button>
            </ItemActions>
          </Item>
        ))}
    </div>
  );
};
export default SearchResults;
