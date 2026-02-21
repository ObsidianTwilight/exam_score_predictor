# 1. Start with a lightweight version of Python 3.10
FROM python:3.10-slim

# 2. Create a folder inside the container called /app
WORKDIR /app

# 3. Copy your requirements file into the container
COPY requirements.txt .

# 4. Install the exact package versions you used
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of your project (app.py, model, static folder) into the container
COPY . .

# 6. Open up port 5000 so we can view the website
EXPOSE 5000

# 7. Tell the container what to do when it turns on
CMD ["python", "app.py"]