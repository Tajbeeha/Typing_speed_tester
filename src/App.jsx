import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import TypingSpeedTester from "./TypingSpeedTester";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/test" element={<TypingSpeedTester />} />
    </Routes>
  );
}

export default App;
