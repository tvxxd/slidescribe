import React, { useEffect, useRef, useState } from "react";
import Trash from "../icons/Trash";
import { text } from "@fortawesome/fontawesome-svg-core";

export default function Card({ note }) {
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);
  const [position, setPosition] = useState(JSON.parse(note.position));

  let mouseStartPosition = { x: 0, y: 0 };
  const cardRef = useRef(null);

  const textAreaRef = useRef(null);
  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  function autoGrow(textarea) {
    const { current } = textarea;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
  }

  function mouseDown(e) {
    mouseStartPosition.x = e.clientX;
    mouseStartPosition.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }

  function mouseMove(e) {
    const mouseMoveDirection = {
      x: mouseStartPosition.x - e.clientX,
      y: mouseStartPosition.y - e.clientY,
    };

    mouseStartPosition.x = e.clientX;
    mouseStartPosition.y = e.clientY;

    setPosition({
      x: cardRef.current.offsetLeft - mouseMoveDirection.x,
      y: cardRef.current.offsetTop - mouseMoveDirection.y,
    });
  }

  return (
    <div
      ref={cardRef}
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
        onMouseDown={mouseDown}
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
