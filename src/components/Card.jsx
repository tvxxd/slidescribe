import React, { useEffect, useRef, useState } from "react";
import Trash from "../icons/Trash";
import { setNewOffset } from "../utils/setNewOffset";
import { autoGrow } from "../utils/autoGrow";
import { bodyParser } from "../utils/bodyParser";
import { setZIndex } from "../utils/zIndex";

export default function Card({ note }) {
  const body = bodyParser(note.body);
  const colors = JSON.parse(note.colors);
  const [position, setPosition] = useState(JSON.parse(note.position));

  let mouseStartPosition = { x: 0, y: 0 };
  const cardRef = useRef(null);

  const textAreaRef = useRef(null);
  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  function mouseDown(e) {
    setZIndex(cardRef.current);
    mouseStartPosition.x = e.clientX;
    mouseStartPosition.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseMove(e) {
    const mouseMoveDirection = {
      x: mouseStartPosition.x - e.clientX,
      y: mouseStartPosition.y - e.clientY,
    };

    mouseStartPosition.x = e.clientX;
    mouseStartPosition.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDirection);

    setPosition(newPosition);
  }

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
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
        className="card-header rounded-t flex justify-between items-center p-[5px]"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        <Trash />
      </div>
      <div className="card-body rounded-b p-4">
        <textarea
          ref={textAreaRef}
          className=" bg-inherit border-0 w-full h-full resize-none text-base focus:outline-none focus:w-full focus:h-full"
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => setZIndex(cardRef.current)}
        ></textarea>
      </div>
    </div>
  );
}
