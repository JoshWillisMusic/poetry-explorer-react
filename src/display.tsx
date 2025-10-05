import { type FC, useMemo, useRef } from "react";
import type { PoemData } from "@/data-model/types.ts";
import type { RestStatus } from "@/data-model/endpoints_slice.ts";
import cn from "classnames";

interface PoemDisplayProps {
  poem: PoemData;
  status: RestStatus;
}
const PoemDisplay: FC<PoemDisplayProps> = ({ poem, status }) => {
  const poemContentRef = useRef<HTMLDivElement>(null);
  const height = useMemo(() => {
    console.log(poemContentRef.current?.getBoundingClientRect().height);
    return poemContentRef.current?.getBoundingClientRect().height;
  }, [poemContentRef]);
  return (
    <div className={cn("relative")}>
      <div
        className={cn(
          "absolute z-20 m-auto mt-8 top-0 left-0 right-0 libre-baskerville-regular overflow-auto h-[calc(100vh_-_100px)]",
        )}
      >
        <div
          className={cn(
            "p-6 flex flex-col gap-2 items-center justify-center ",
            {
              "blur-sm": status === "loading",
              "opacity-40": status === "loading",
            },
          )}
        >
          <span
            className={cn(
              "text-2xl libre-baskerville-bold whitespace-pre-wrap text-center",
            )}
          >
            {poem.title.replace(/([.,:])/g, "$1\n")}
          </span>
          <span>by {poem.author}</span>
          <span>Number of Lines - {poem.linecount}</span>
        </div>
        <p
          className={cn("p-2.5 flex flex-col items-center", {
            "blur-sm": status === "loading",
            "opacity-40": status === "loading",
          })}
        >
          {poem.lines?.map((line, index) => (
            <span key={poem.title + poem.title + index.toString()}>{line}</span>
          ))}
        </p>
      </div>
    </div>
  );
};
export default PoemDisplay;
