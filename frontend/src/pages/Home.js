import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMaps, createMap as apiCreateMap } from "../api/api";

export default function Home() {
    const [maps, setMaps] = useState([]);
    const [mapName, setMapName] = useState(""); // 存儲使用者輸入的地圖名稱
    const navigate = useNavigate();  // 使用 React Router 進行導航

    // 取得地圖列表
    const fetchMaps = async () => {
        const mapData = await getMaps();
        if (mapData) {
            setMaps(mapData);
        }
    };

    useEffect(() => {
        fetchMaps();
    }, []);

    // 新增地圖
    const createMap = async () => {
        if (!mapName.trim()) {
            alert("請輸入地圖名稱！");
            return;
        }
        
        const newMap = await apiCreateMap(mapName);
        if (newMap) {
            setMaps([...maps, newMap]); // 更新狀態
            setMapName(""); // 清空輸入框
        }
    };
    
    return (
        <div>
            <h1>旅遊紀錄地圖</h1>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="輸入地圖名稱"
                    value={mapName}
                    onChange={(e) => setMapName(e.target.value)}
                />
                <button onClick={createMap}>新增地圖</button>
            </div>
            <h2>已建立的地圖：</h2>
            <ul>
                {maps.length > 0 ? (
                    maps.map((map) => (
                        <li key={map.id}>
                            <Link to={`/map/${map.id}`}>{map.name}</Link>
                        </li>
                    ))
                ) : (
                    <p>目前沒有地圖</p>
                )}
            </ul>
        </div>
    );
}
