import React from "react";

export default function Card({ note }) {
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);
  let position = JSON.parse(note.position);
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
      ></div>
      <div className="card-body card-body-border p-4">
        <textarea
          className=" bg-inherit border-0 w-full h-full resize-none text-base focus:outline-none focus:w-full focus:h-full"
          style={{ color: colors.colorText }}
          defaultValue={body}
        ></textarea>
      </div>
    </div>
  );
}
