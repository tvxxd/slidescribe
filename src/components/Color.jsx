export default function Color({ color }) {
  function changeColor() {
    console.log("clicked");
  }

  return (
    <div
      onClick={changeColor}
      className="color"
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
}
