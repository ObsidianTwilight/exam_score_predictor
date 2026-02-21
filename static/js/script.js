document.getElementById('predictionForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent page refresh

    // Gather all data from the form
    const formData = {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        course: document.getElementById('course').value,
        study_hours: document.getElementById('study_hours').value,
        class_attendance: document.getElementById('class_attendance').value,
        internet_access: document.getElementById('internet_access').value,
        sleep_hours: document.getElementById('sleep_hours').value,
        sleep_quality: document.getElementById('sleep_quality').value,
        study_method: document.getElementById('study_method').value,
        facility_rating: document.getElementById('facility_rating').value,
        exam_difficulty: document.getElementById('exam_difficulty').value
    };

    try {
        // Send data to the Flask backend
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        // Display the result
        const resultBox = document.getElementById('resultBox');
        const scoreDisplay = document.getElementById('scoreDisplay');
        
        if (result.success) {
            scoreDisplay.innerText = result.predicted_score + ' / 100';
            scoreDisplay.style.color = '#2ecc71';
        } else {
            scoreDisplay.innerText = "Error analyzing data.";
            scoreDisplay.style.color = '#e74c3c';
            console.error(result.error);
        }
        
        resultBox.classList.remove('hidden');
        
    } catch (error) {
        console.error("Fetch error:", error);
    }
});