import React, { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import { getNotes } from "../supabase/apiNotes.js";
export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await getNotes();
      setNotes(notesData);
    };
    fetchNotes();
  }, []);

  return (
    <div>
      {notes.map((note) => (
        <Card key={note.id} note={note} />
      ))}
    </div>
  );
}
