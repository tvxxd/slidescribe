import React, { useEffect, useRef, useState } from "react";
import Trash from "../icons/Trash";
import { setNewOffset } from "../utils/setNewOffset";
import { autoGrow } from "../utils/autoGrow";
import { bodyParser } from "../utils/bodyParser";
import { setZIndex } from "../utils/zIndex";
import { updateNotes } from "../supabase/apiNotes";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default function Card({ note }) {
  const body = bodyParser(note.body);
  const colors = JSON.parse(note.colors);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const [updating, setUpdating] = useState(false);

  const keyUpTimerId = useRef(null);

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

    /*
      since state updates are asynchronous, 'pos' might not be updated
      when calling updateNotes(). pass 'pos' directly to updateNotes.
    */

    const newPosition = {
      x: parseInt(cardRef.current.style.left),
      y: parseInt(cardRef.current.style.top),
    };

    updateNotes(note.id, "position", newPosition);
  }

  async function handleKeyUp() {
    setUpdating(true);

    if (keyUpTimerId.current) clearTimeout(keyUpTimerId.current);

    keyUpTimerId.current = setTimeout(() => {
      updateNotes(note.id, "body", textAreaRef.current.value, setUpdating);
      console.log("updating")
    }, 1500);
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
          onKeyUp={handleKeyUp}
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
