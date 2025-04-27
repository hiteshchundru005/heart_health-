// Storage for prediction history
let heartHistory = JSON.parse(localStorage.getItem('heartHistory')) || [];

function predictHeartDisease() {
    // Get input values
    const age = parseFloat(document.getElementById('age').value);
    const chol = parseFloat(document.getElementById('chol').value);
    
    // Validate inputs
    if (isNaN(age) || isNaN(chol)) {
        showAlert("Please enter valid numbers for all fields!");
        return;
    }

    // Your existing risk calculation
    const risk = (age * 0.05) + (chol > 200 ? 30 : 10);
    const probability = Math.min(risk, 95);
    const isHighRisk = probability > 50;

    // Create result object
    const prediction = {
        date: new Date().toLocaleString(),
        age,
        chol,
        probability: probability.toFixed(2),
        status: isHighRisk ? "High" : "Low"
    };

    // Store prediction
    heartHistory.unshift(prediction);
    localStorage.setItem('heartHistory', JSON.stringify(heartHistory));

    // Display animated result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.className = 'result-box'; // Reset classes
    
    setTimeout(() => {
        resultDiv.innerHTML = isHighRisk 
            ? `⚠️ <strong>High Risk (${probability.toFixed(2)}%)</strong> - Consult a doctor!`
            : `✅ <strong>Low Risk (${probability.toFixed(2)}%)</strong> - Keep monitoring!`;
        resultDiv.style.color = isHighRisk ? '#e74c3c' : '#2ecc71';
        resultDiv.classList.add('animate__animated', 'animate__fadeIn');
    }, 100);

    // Update history display
    updateHistoryDisplay();
}

// Helper function to show alerts
function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert animate__animated animate__headShake';
    alertBox.textContent = message;
    alertBox.style.backgroundColor = '#e74c3c';
    
    const container = document.querySelector('.container');
    container.prepend(alertBox);
    
    setTimeout(() => alertBox.remove(), 3000);
}

// Update history display
function updateHistoryDisplay() {
    const historyDiv = document.getElementById('historyList');
    historyDiv.innerHTML = '';
    
    heartHistory.slice(0, 5).forEach(item => {
        const entry = document.createElement('div');
        entry.className = `history-item ${item.status === 'High' ? 'high-risk' : 'low-risk'}`;
        entry.innerHTML = `
            <small>${item.date}</small><br>
            Age: ${item.age} | Chol: ${item.chol}<br>
            <strong>${item.probability}% ${item.status} Risk</strong>
        `;
        historyDiv.appendChild(entry);
    });
}

// Reset form function
function resetForm() {
    document.getElementById('heartForm').reset();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.style.color = '';
    resultDiv.className = 'result-box';
}