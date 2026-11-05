import Login from "./components/Login";
import AnalysisResultPage from "./components/AnalysisResultPage";
import UploadPage from "./components/UploadPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex items-center flex-col">
        {/* Background glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0"></div>

        {/* Top right */}
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#6F7AF2]/25 blur-[120px]" />
        {/* Top left */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#6F7AF2]/20 blur-[120px]" />

        {/* Left glow */}
        <div className="fixed -left-40 top-1/2 h-96 w-96 rounded-full bg-[#FA7185]/40 blur-[120px] pointer-events-none" />

        {/* Right glow */}
        <div className="fixed -right-40 top-1/2 h-96 w-96 rounded-full bg-[#FA7185]/40 blur-[120px] pointer-events-none" />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/upload" element={<UploadPage />} />

          <Route path="/analysisresultpage" element={<AnalysisResultPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
