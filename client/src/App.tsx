import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Playground from "./pages/Playground";
import CodeShare from "./pages/CodeShare";
import CreateCodeShare from "./pages/CreateCodeShare";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from "react-helmet-async";

function RouteList() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/codeshare/:roomId" element={<CodeShare />} />
        <Route path="/codeshare" element={<CreateCodeShare />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
function App() {
  return (
    <div className="">
      <HashRouter>
        <HelmetProvider>
          <RouteList />
        </HelmetProvider>
      </HashRouter>
    </div>
  );
}

export default App;
