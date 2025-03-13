import axios from 'axios';

const API_BASE_URL = "http://localhost:5001/api"; // 後端 API 位置

// 地圖相關 API
export const getMaps = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/maps/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching maps:", error);
        return [];
    }
};

export const getMap = async (mapId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/maps/${mapId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching map ${mapId}:`, error);
        return null;
    }
};

export const createMap = async (mapName, description = "") => {
    try {
        const response = await axios.post(`${API_BASE_URL}/maps/`, {
            name: mapName,
            description: description
        });
        return response.data;
    } catch (error) {
        console.error("Error creating map:", error);
        return null;
    }
};

export const updateMap = async (mapId, mapData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/maps/${mapId}/`, mapData);
        return response.data;
    } catch (error) {
        console.error(`Error updating map ${mapId}:`, error);
        return null;
    }
};

export const deleteMap = async (mapId) => {
    try {
        await axios.delete(`${API_BASE_URL}/maps/${mapId}/`);
        return true;
    } catch (error) {
        console.error(`Error deleting map ${mapId}:`, error);
        return false;
    }
};

// 地點相關 API
export const getLocations = async (mapId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/maps/${mapId}/locations/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching locations for map ${mapId}:`, error);
        return [];
    }
};

export const createLocation = async (mapId, locationData) => {
    try {
        const response = await fetch(`/api/maps/${mapId}/locations/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify(locationData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('Server error:', errorData);
            throw new Error(`Server responded with ${response.status}: ${errorData || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating location:', error);
        throw error; // 將錯誤傳遞給調用方
    }
};

export const updateLocation = async (locationId, locationData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/locations/${locationId}/`, locationData);
        return response.data;
    } catch (error) {
        console.error(`Error updating location ${locationId}:`, error);
        return null;
    }
};

export const deleteLocation = async (locationId) => {
    try {
        await axios.delete(`${API_BASE_URL}/locations/${locationId}/`);
        return true;
    } catch (error) {
        console.error(`Error deleting location ${locationId}:`, error);
        return false;
    }
};