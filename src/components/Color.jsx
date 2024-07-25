export default function Color({ color }) {
  function changeColor() {
    console.log("clicked");
  }

  return (
    <div
      onClick={changeColor}
      id="color"
      className="bg-gray-300 w-7 h-7 rounded-full cursor-pointer hover:scale-110"
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
}
