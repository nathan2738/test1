let currentQuestions = 'carQuestions';
const QuestionsOrder = [
    'carQuestions', 'energyQuestions', 'wasteQuestions', 'airTravelQuestions',
    'dietQuestions', 'clothingPurchasesQuestions', 'electronicsPurchasesQuestions',
    'packagedFoodPurchasesQuestions', 'furniturePurchasesQuestions', 'appliancePurchasesQuestions',
    'mediaPurchasesQuestions', 'recyclingQuestions', 'publicTransportQuestions'
];
const nextButtons = document.querySelectorAll('.next-Questions-button');

// --- Initial setup for Questions and buttons ---
function hideAllQuestions() {
    QuestionsOrder.forEach(QuestionsId => {
        document.getElementById(QuestionsId).style.display = 'none';
    });
    document.getElementById('carTypes').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}

hideAllQuestions();
document.getElementById(currentQuestions).style.display = 'block';
document.getElementById('showEnergyQuestions').style.display = 'inline-block';
document.getElementById('backButton').style.display = 'none';
document.getElementById('calculateButton').style.display = 'none';

// --- Car Questions ---
document.getElementById('yes').addEventListener('change', function() {
    document.getElementById('carTypes').style.display = 'block';
    document.getElementById('showEnergyQuestions').disabled = !document.getElementById('carMiles').value || document.getElementById('carMiles').value < 0;
    document.getElementById('carMilesErrorMessage').style.display = document.getElementById('showEnergyQuestions').disabled ? 'block' : 'none';
});

document.getElementById('no').addEventListener('change', function() {
    document.getElementById('carTypes').style.display = 'none';
    document.getElementById('showEnergyQuestions').disabled = false;
    document.getElementById('carMilesErrorMessage').style.display = 'none';
    document.getElementById('carMiles').value = '';
});

document.getElementById('carMiles').addEventListener('input', function() {
    const carMilesValue = document.getElementById('carMiles').value;
    document.getElementById('showEnergyQuestions').disabled = !(carMilesValue && carMilesValue >= 0);
    document.getElementById('carMilesErrorMessage').style.display = document.getElementById('showEnergyQuestions').disabled ? 'block' : 'none';
});

// --- "Next Questions" Button Click ---
nextButtons.forEach(button => {
    button.addEventListener('click', function() {
        const currentQuestionsIndex = QuestionsOrder.indexOf(currentQuestions);
        if (currentQuestionsIndex < QuestionsOrder.length - 1) {
            document.getElementById(currentQuestions).style.display = 'none';
            currentQuestions = QuestionsOrder[currentQuestionsIndex + 1];
            document.getElementById(currentQuestions).style.display = 'block';
            document.getElementById('backButton').style.display = currentQuestions !== 'carQuestions' ? 'inline-block' : 'none';
            document.getElementById('calculateButton').style.display = currentQuestions === 'publicTransportQuestions' ? 'inline-block' : 'none';
        }
    });
});

// --- "Back" Button ---
document.getElementById('backButton').addEventListener('click', function() {
    const currentQuestionsIndex = QuestionsOrder.indexOf(currentQuestions);
    if (currentQuestionsIndex > 0) {
        document.getElementById(currentQuestions).style.display = 'none';
        currentQuestions = QuestionsOrder[currentQuestionsIndex - 1];
        document.getElementById(currentQuestions).style.display = 'block';
        document.getElementById('backButton').style.display = currentQuestions !== 'carQuestions' ? 'inline-block' : 'none';
        document.getElementById('calculateButton').style.display = 'none';
        
        // Show the next button for the current Questions
        const nextButtonId = `show${currentQuestions.slice(0, 1).toUpperCase() + currentQuestions.slice(1)}Questions`;
        document.getElementById(nextButtonId).style.display = 'inline-block';
    }
});

// --- Footprint Calculation ---
function calculateCarbonFootprint() {
    let totalFootPrint = 0;

    // Car Footprint
    const carMiles = parseFloat(document.getElementById('carMiles').value) || 0;
    const carType = document.getElementById('carType') ? document.getElementById('carType').value : 'petrol';
    const emissionFactors = { petrol: 0.404, diesel: 0.454, electric: 0.0, hybrid: 0.229 };
    totalFootPrint += carMiles * (emissionFactors[carType] || 0);

    // Energy Footprint
    const energyUsage = parseFloat(document.getElementById('energyUsage').value) || 0;
    totalFootPrint += energyUsage * 0.233;

    // Waste Footprint
    const wasteProduction = parseFloat(document.getElementById('wasteProduction').value) || 0;
    totalFootPrint += wasteProduction * 0.001;

    // Air Travel Footprint
    const flights = parseInt(document.getElementById('flights').value) || 0;
    totalFootPrint += flights * 100;

    // Diet Footprint
    const diet = document.getElementById('diet').value;
    const dietEmissionFactors = {
        keto: 7.19,
        standardAmerican: 5.79,
        paleo: 5.06,
        mediterranean: 2.89,
        climatarian: 2.46,
        vegan: 2.89
    };
    totalFootPrint += dietEmissionFactors[diet] * 365;

    // Purchases Footprint
    const clothingPurchases = parseInt(document.getElementById('clothingPurchases').value) || 0;
    const electronicsPurchases = parseInt(document.getElementById('electronicsPurchases').value) || 0;
    const packagedFoodPurchases = parseInt(document.getElementById('packagedFoodPurchases').value) || 0;
    const furniturePurchases = parseInt(document.getElementById('furniturePurchases').value) || 0;
    const appliancePurchases = parseInt(document.getElementById('appliancePurchases').value) || 0;
    const mediaPurchases = parseInt(document.getElementById('mediaPurchases').value) || 0;

    totalFootPrint += clothingPurchases * 10;
    totalFootPrint += electronicsPurchases * 50;
    totalFootPrint += packagedFoodPurchases * 5;
    totalFootPrint += furniturePurchases * 80;
    totalFootPrint += appliancePurchases * 150;
    totalFootPrint += mediaPurchases * 2;

    // Recycling Footprint
    const recyclingHabit = document.getElementById('recycling').value;
    if (recyclingHabit === 'sometimes') totalFootPrint -= 50;
    if (recyclingHabit === 'always') totalFootPrint -= 100;

    // Public Transport Footprint
    const publicTransportUsage = document.getElementById('publicTransport').value;
    if (publicTransportUsage === 'occasionally') totalFootPrint -= 80;
    if (publicTransportUsage === 'frequently') totalFootPrint -= 150;

    // Display the result
    const resultElement = document.getElementById('result');
    resultElement.innerText = `Your total carbon footprint is ${totalFootPrint.toFixed(2)} kg CO2 per year.`;
    resultElement.style.display = 'block';
}

// Login Form Handler
const loginForm = document.getElementById('loginForm'); // Make sure the login form has this ID in HTML
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    alert(data.message);  // Display the response message (e.g., "Login successful!" or error)
  });
}
