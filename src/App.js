import { BrowserRouter } from "react-router-dom"

// Import pages
import Routes from "./config/Routes"

function App() {
  return (
    <BrowserRouter>
        {/* <ReloadNavegationAnimation/> */}
        <Routes/>
    </BrowserRouter>
  );
}

export default App;
