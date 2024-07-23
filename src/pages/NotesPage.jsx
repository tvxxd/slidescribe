import React from "react";
import { data as notes } from "../utils/data.js";
import Card from "../components/Card.jsx";

export default function NotesPage() {
  return (
    <div>
      {notes.map((note) => (
        <Card key={note.id} note={note} />
      ))}
    </div>
  );
}
