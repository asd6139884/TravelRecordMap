import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMap, getLocations, createLocation, deleteLocation } from "../api/api";

export default function MapPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [map, setMap] = useState(null);
    const [locations, setLocations] = useState([]);
    const [newLocation, setNewLocation] = useState({
        name: "",
        description: "",
        latitude: "",
        longitude: "",
        visit_date: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const mapData = await getMap(id);
            if (mapData) {
                setMap(mapData);
                const locationsData = await getLocations(id);
                setLocations(locationsData);
            }
            setLoading(false);
        };
        
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLocation({
            ...newLocation,
            [name]: value
        });
    };

    const handleAddLocation = async () => {
        // 基本驗證
        if (!newLocation.name || !newLocation.latitude || !newLocation.longitude) {
            alert("請填寫地點名稱、緯度和經度！");
            return;
        }
        
        try {
            // 確保緯度和經度是有效的數字
            const latitude = parseFloat(newLocation.latitude);
            const longitude = parseFloat(newLocation.longitude);
            
            if (isNaN(latitude) || isNaN(longitude)) {
              alert("緯度和經度必須是有效的數字！");
              return;
            }
        
            // 創建新地點
            const locationData = {
              ...newLocation,
              latitude: latitude,
              longitude: longitude
            };
        
            console.log("Sending location data:", locationData); // 調試用
            
            const createdLocation = await createLocation(id, locationData);
            if (createdLocation) {
            console.log("Location created:", createdLocation); // 調試用
            setLocations([...locations, createdLocation]);
            // 重置表單
            setNewLocation({
                name: "",
                description: "",
                latitude: "",
                longitude: "",
                visit_date: ""
            });
            alert("地點新增成功！");
            } else {
            alert("地點新增失敗，請檢查輸入內容或稍後再試。");
            }
        } catch (error) {
            console.error("Error adding location:", error);
            alert("添加地點時出錯：" + error.message);
        }
    };

    const handleDeleteLocation = async (locationId) => {
        if (window.confirm("確定要刪除這個地點嗎？")) {
            const success = await deleteLocation(locationId);
            if (success) {
                setLocations(locations.filter(loc => loc.id !== locationId));
            }
        }
    };

    if (loading) return <h1>載入中...</h1>;
    if (!map) return <h1>找不到該地圖</h1>;

    return (
        <div className="map-page">
            <h1>{map.name}</h1>
            {map.description && <p className="map-description">{map.description}</p>}
            <p>建立時間：{new Date(map.created_at).toLocaleString()}</p>
            
            <div className="location-form">
                <h2>新增旅遊地點</h2>
                <div>
                    <label>
                        地點名稱:
                        <input 
                            type="text" 
                            name="name" 
                            value={newLocation.name} 
                            onChange={handleInputChange} 
                        />
                    </label>
                </div>
                <div>
                    <label>
                        描述:
                        <textarea 
                            name="description" 
                            value={newLocation.description} 
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        緯度:
                        <input 
                            type="number" 
                            name="latitude" 
                            value={newLocation.latitude} 
                            onChange={handleInputChange}
                            step="any"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        經度:
                        <input 
                            type="number" 
                            name="longitude" 
                            value={newLocation.longitude} 
                            onChange={handleInputChange}
                            step="any"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        訪問日期:
                        <input 
                            type="date" 
                            name="visit_date" 
                            value={newLocation.visit_date} 
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <button onClick={handleAddLocation}>新增地點</button>
            </div>
            
            <h2>地點列表</h2>
            {locations.length === 0 ? (
                <p>還沒有新增地點</p>
            ) : (
                <ul className="location-list">
                    {locations.map(location => (
                        <li key={location.id} className="location-item">
                            <h3>{location.name}</h3>
                            {location.description && <p>{location.description}</p>}
                            <p>座標：{location.latitude}, {location.longitude}</p>
                            {location.visit_date && <p>訪問日期：{location.visit_date}</p>}
                            <button onClick={() => handleDeleteLocation(location.id)}>刪除</button>
                        </li>
                    ))}
                </ul>
            )}
            
            <button onClick={() => navigate('/')}>返回首頁</button>
        </div>
    );
}