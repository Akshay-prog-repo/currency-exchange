const apiKey = 'YOUR_API_KEY'; // Replace with your API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

document.getElementById('exchange-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;

  if (!amount || isNaN(amount)) {
    alert('Please enter a valid amount.');
    return;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.result === 'error') {
      throw new Error(data['error-type']);
    }

    const rates = data.conversion_rates;
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (!fromRate || !toRate) {
      throw new Error('Invalid currency selected.');
    }

    const convertedAmount = (amount / fromRate) * toRate;
    document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    document.getElementById('result').innerText = 'Error fetching exchange rates. Please try again later.';
  }
});
