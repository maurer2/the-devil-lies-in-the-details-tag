import { useState } from "react";
import { wrapper } from "./app.css.ts";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className={wrapper}>
      <h1>Accordion</h1>
    </main>
  );
}

export default App;
