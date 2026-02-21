from flask import Flask, request, jsonify
import joblib
import pandas as pd

# Initialize Flask and point it to the 'static' folder for the frontend
app = Flask(__name__, static_folder='static', static_url_path='')

# Load the trained machine learning pipeline
model = joblib.load('exam_score_predictor.pkl')

@app.route('/')
def home():
    # Serve the main HTML file
    return app.send_static_file('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # 1. Get the JSON data sent by the frontend JavaScript
        data = request.json
        

        # 2. Convert specific string inputs to numbers to match training data
        data['age'] = int(data['age'])
        data['study_hours'] = float(data['study_hours'])
        data['class_attendance'] = float(data['class_attendance'])
        data['sleep_hours'] = float(data['sleep_hours'])
        
        # 3. Convert the dictionary into a 1-row Pandas DataFrame
        df = pd.DataFrame([data])
        
        # 4. Make the prediction using the loaded model
        prediction = model.predict(df)
        
        # 5. Return the result back to the frontend
        return jsonify({
            'success': True,
            'predicted_score': round(prediction[0], 2)
        })

    except Exception as e:
        # This will print the exact error in RED in your VS Code terminal!
        print(f"\n--- MODEL ERROR ---\n{str(e)}\n-------------------\n")
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    # host='0.0.0.0' tells Docker to make the app accessible outside the container
    app.run(host='0.0.0.0', port=5000, debug=False)