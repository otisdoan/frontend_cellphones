/* eslint-disable no-debugger */
import "./App.css";

function App() {
  const arr = ["Le Doan Hieu", "A", "B", "C"];
  arr.forEach((element) => {
    console.log(element);
  });
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
