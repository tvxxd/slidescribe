import AddButton from "./AddButton";

export default function Controls() {
  return (
    <div id="controls flex flex-column gap-4 items-center fixed left-4 top-1/2 bg-[#35363e] p-4 z-[10000]">
      <AddButton />
    </div>
  );
}
