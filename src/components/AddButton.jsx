import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useRef } from "react";
import { createNote } from "../supabase/apiNotes";

export default function AddButton({ setNotes }) {
  const startingPosition = useRef(50);

  async function addNote() {
    const payload = {
      position: JSON.stringify({
        x: startingPosition.current,
        y: startingPosition.current,
      }),
      colors: JSON.stringify(colors[0]),
    };
    const response = await createNote(payload);
    setNotes((prevState) => [response, ...prevState]);
  }

  return (
    <div
      onClick={addNote}
      id="add-btn"
      className="flex justify-center items-center rounded-full cursor-pointer w-7 h-7 hover:scale-110"
    >
      <Plus />
    </div>
  );
}
