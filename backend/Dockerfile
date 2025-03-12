# 使用官方 Python 映像
FROM python:3.12.6

# 設置工作目錄
WORKDIR /app

# 複製 requirements.txt 到容器中
COPY requirements.txt .

# 安裝所有依賴
RUN pip install --no-cache-dir -r requirements.txt

# 複製所有項目檔案到容器中
COPY . .

# 設定環境變數 (可選)
ENV PYTHONUNBUFFERED 1

# 容器啟動後執行的命令
CMD ["python", "manage.py", "runserver", "0.0.0.0:5000"]
