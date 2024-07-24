import React, { useEffect, useRef } from "react";
import Trash from "../icons/Trash";
import { text } from "@fortawesome/fontawesome-svg-core";

export default function Card({ note }) {
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);
  let position = JSON.parse(note.position);

  const textAreaRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  function autoGrow(textarea) {
    const { current } = textarea;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
  }

  return (
    <div
      className="card absolute"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header card-header-border flex justify-between items-center p-[5px]"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <Trash />
      </div>
      <div className="card-body card-body-border p-4">
        <textarea
          ref={textAreaRef}
          className=" bg-inherit border-0 w-full h-full resize-none text-base focus:outline-none focus:w-full focus:h-full"
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
        ></textarea>
      </div>
    </div>
  );
}
