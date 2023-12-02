import { BrowserRouter } from "react-router-dom";
import { Navmenu } from "./component";
import Router from "./router";

function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Navmenu/>
        <Router/>
      </BrowserRouter>

      {/* <Myswiper /> */}
    </div>
  );
}

export default App;
