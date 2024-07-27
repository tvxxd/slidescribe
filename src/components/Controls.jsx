import AddButton from "./AddButton";
import colors from "../assets/colors.json";
import Color from "./Color";

export default function Controls({ onSetNotes }) {
  return (
    <div
      id="controls"
      className="flex gap-4 items-center fixed top-9 left-1/2 bg-[#35363e] p-3 z-[10000] rounded"
    >
      <AddButton setNotes={onSetNotes} />
      {colors.map((color) => (
        <Color key={color.id} color={color} />
      ))}
    </div>
  );
}
