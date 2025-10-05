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
  const getPoem = usePoetryExplorerStore((state) => state.getPoem);
  useEffect(() => {
    console.log(searchResults.data);
  }, [searchResults]);

  return (
    <div
      className={cn(
        "flex flex-col gap-2 h-[calc(100vh_-_48px)] overflow-y-auto p-2.5",
      )}
    >
      {searchResults.data.length === 0 && (
        <Item variant="outline">No results found</Item>
      )}

      {searchResults.data.map((result, index) => (
        <Item
          variant="muted"
          key={result.author + result.title + index.toString()}
        >
          <ItemContent
            className={cn({
              "blur-sm": searchResults.status === "loading",
              "opacity-30": searchResults.status === "loading",
            })}
          >
            <ItemTitle>{result.title}</ItemTitle>
            <ItemDescription>
              {result.author} - {result.linecount} lines
            </ItemDescription>
          </ItemContent>
          <ItemActions
            className={cn({
              "blur-sm": searchResults.status === "loading",
              "opacity-10": searchResults.status === "loading",
            })}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => getPoem(result.author, result.title)}
            >
              Preview
            </Button>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
};
export default SearchResults;
