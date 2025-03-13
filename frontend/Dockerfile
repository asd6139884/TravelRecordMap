# 使用 Node.js 官方 LTS 版本
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製專案檔案
COPY . .

# 開放開發用的 port
EXPOSE 3000

# 啟動 React 開發伺服器
CMD ["npm", "start"]
