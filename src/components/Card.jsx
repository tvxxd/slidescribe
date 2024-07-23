import React from "react";

export default function Card({ note }) {
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);
  let position = JSON.parse(note.position);
  return (
    <div className="card" style={{ backgroundColor: colors.colorBody }}>
      {body}
    </div>
  );
}


