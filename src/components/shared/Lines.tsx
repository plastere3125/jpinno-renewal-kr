import { Fragment, type ReactNode } from "react";

/**
 * 문자열 속 "\n"을 PC(xl 이상)에서만 줄바꿈으로 쓴다. 모바일은 공백으로 이어져 자연스럽게 흐른다.
 * wide: 본문처럼 긴 줄은 최대 폭(1400px 이상)에서만 줄바꿈.
 */
export default function Lines({ text, wide = false }: { text: ReactNode; wide?: boolean }) {
  if (typeof text !== "string" || !text.includes("\n")) return <>{text}</>;
  return (
    <>
      {text.split("\n").map((s, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <>
              {" "}
              <br className={wide ? "hidden min-[1400px]:block" : "hidden xl:block"} />
            </>
          )}
          {s}
        </Fragment>
      ))}
    </>
  );
}
