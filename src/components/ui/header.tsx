import { ModeToggle } from "@/components/mode-toggle.tsx";
import { PoetryExplorerLogo } from "@/components/icon/poetry-explorer-logo.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group.tsx";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce.ts";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { searchByAuthor, searchByTitle } from "@/data-model/endpoints.ts";

function Header() {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState<"author" | "title">("author");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    console.log(searchBy);
    if (searchBy === "author") {
      console.log("searching authors for ", debouncedSearch);
      if (debouncedSearch.length > 0) {
        searchByAuthor(debouncedSearch).then((result) =>
          setSearchResults(result),
        );
      }
    } else {
      console.log("searching titles for ", debouncedSearch);
      if (debouncedSearch.length > 0) {
        searchByTitle(debouncedSearch).then((result) =>
          setSearchResults(result),
        );
      }
    }
  }, [debouncedSearch, searchBy]);
  return (
    <div
      className={
        "sticky top-0 left-0 z-50 h-12 w-screen flex gap-4 justify-between items-center border-b px-4"
      }
    >
      <div className={"flex gap-2 items-center flex-nowrap whitespace-nowrap"}>
        <PoetryExplorerLogo />
        Poetry Explorer
      </div>
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          onChange={(event) => setSearch(event.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {searchResults.length} results
        </InputGroupAddon>
      </InputGroup>
      <label htmlFor={"g1"} className={"whitespace-nowrap text-sm"}>
        Search By:
      </label>
      <RadioGroup
        id={"g1"}
        defaultValue="author"
        value={searchBy}
        className={"flex gap-3"}
        onValueChange={(value: string) => {
          setSearchBy(value as "author" | "title");
        }}
      >
        <div className="flex items-center gap-1">
          <RadioGroupItem value="author" id="r1" />
          <Label htmlFor="r1">Author</Label>
        </div>
        <div className="flex items-center gap-1">
          <RadioGroupItem value="title" id="r2" />
          <Label htmlFor="r2">Title</Label>
        </div>
      </RadioGroup>
      <ModeToggle />
    </div>
  );
}
export default Header;
