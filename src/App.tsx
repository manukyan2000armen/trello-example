import { BrowserRouter } from "react-router-dom";
import { MyRouter } from "./router/MyRouter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MyRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
