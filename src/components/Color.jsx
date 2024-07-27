import { useEffect, useState } from "react";
import { updateNotes } from "../supabase/apiNotes";

export default function Color({ color, selectedNote, onSetNotes, notes }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setMessage("");
    }
  }, [selectedNote]);

  async function changeColor() {
    if (!selectedNote) {
      setMessage("Select a note before changing its color!");
      setTimeout(() => {
        setMessage("");
      }, 1500);
      return;
    }

    try {
      const currentNoteIndex = notes.findIndex(
        (note) => note.id === selectedNote.id
      );

      const updatedNote = {
        ...notes[currentNoteIndex],
        colors: JSON.stringify(color),
      };

      const newNotes = [...notes];
      newNotes[currentNoteIndex] = updatedNote;
      onSetNotes(newNotes);

      await updateNotes(selectedNote.id, "colors", color);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div
        onClick={changeColor}
        id="color"
        className="bg-gray-300 w-7 h-7 rounded-full cursor-pointer hover:scale-110"
        style={{ backgroundColor: color.colorHeader }}
      ></div>
      {message && (
        <p className="absolute text-red-500 left-[-22px] bottom-[-25px] text-center font-bold w-80">{message}</p>
      )}
    </>
  );
}
