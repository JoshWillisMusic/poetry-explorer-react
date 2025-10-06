import { usePoetryExplorerStore } from "@/data-model/store.ts";
import cn from "classnames";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item.tsx";
import { BookText, Star } from "lucide-react";
import { Toggle } from "@/components/ui/toggle.tsx";
const SearchResults = () => {
  const searchResults = usePoetryExplorerStore((state) => state.searchResults);
  const getPoem = usePoetryExplorerStore((state) => state.getPoem);
  const selectedPoem = usePoetryExplorerStore((state) => state.poem);

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
          className={cn({
            "border-border":
              result.author + result.title ===
              selectedPoem.data.author + selectedPoem.data.title,
            "bg-card":
              result.author + result.title ===
              selectedPoem.data.author + selectedPoem.data.title,
          })}
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
            <Toggle
              variant="outline"
              size="sm"
              onClick={() => getPoem(result.author, result.title)}
              pressed={
                result.author + result.title ===
                selectedPoem.data.author + selectedPoem.data.title
              }
            >
              Display
              <BookText />
            </Toggle>
            <Toggle variant="outline" size="sm">
              <Star />
            </Toggle>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
};
export default SearchResults;
