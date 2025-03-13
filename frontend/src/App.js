import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";

// // 地圖頁面
// function MapPage() {
//   const { id } = useParams();  // 獲取 URL 參數
//   const [map, setMap] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//       fetch(`http://localhost:5001/api/maps/${id}/`)
//           .then(response => response.json())
//           .then(data => setMap(data))
//           .catch(error => console.error("Error fetching map:", error));
//   }, [id]);

//   if (!map) return <h1>載入中...</h1>;

//   return (
//     <div>
//         <h1>{map.name}</h1>
//         <p>建立時間：{new Date(map.created_at).toLocaleString()}</p>
//         <button onClick={() => navigate('/')}>返回首頁</button>
//     </div>
// );
// }

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map/:id" element={<MapPage />} />
          </Routes>
      </Router>
  );
}

export default App;
