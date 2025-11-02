import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";
import ChatWidget from "./components/chat/ChatWidget";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ChatWidget />
    </>
  );
}

export default App;
