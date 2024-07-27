import React, { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import { getNotes } from "../supabase/apiNotes.js";
import Controls from "../components/Controls.jsx";
import Spinner from "../icons/Spinner.jsx";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await getNotes(setLoading);
      setNotes(notesData);
    };
    fetchNotes();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner color="black" size="40" />
        </div>
      ) : (
        <>
          {notes.map((note) => (
            <Card key={note.id} note={note} setNotes={setNotes} />
          ))}
          <Controls onSetNotes={setNotes} />
        </>
      )}
    </div>
  );
}
