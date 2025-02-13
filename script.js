const apiKey = '7b5775fddea3c6c627593450'; // Replace with your API key

document.getElementById('exchange-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;

  // Validate input
  if (!amount || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  // Show loading state
  document.getElementById('result').innerText = 'Converting...';

  try {
    // Fetch exchange rates based on the selected "fromCurrency"
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Check if the API returned an error
    if (data.result === 'error') {
      throw new Error(data['error-type']);
    }

    const rates = data.conversion_rates;

    // Validate if the selected currencies exist in the API response
    if (!rates[toCurrency]) {
      throw new Error('Invalid currency selected.');
    }

    // Perform the conversion
    const convertedAmount = (amount * rates[toCurrency]).toFixed(2);
    document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    document.getElementById('result').innerText = 'Error fetching exchange rates. Please try again later.';
  }
});
