// utils/getFinancialAdvice.js
export default async function getFinancialAdvice(totalBudget, totalIncome, totalSpend) {
  try {
    // Log the incoming values
    console.log('getFinancialAdvice received:', {
      totalBudget: typeof totalBudget + ' -> ' + totalBudget,
      totalIncome: typeof totalIncome + ' -> ' + totalIncome,
      totalSpend: typeof totalSpend + ' -> ' + totalSpend
    });

    // Validate values before making request
    if (!totalBudget || !totalIncome || !totalSpend) {
      console.log('Invalid values detected');
      return "Please ensure all financial data is provided.";
    }

    const payload = {
      totalBudget: Number(totalBudget),
      totalIncome: Number(totalIncome),
      totalSpend: Number(totalSpend)
    };

    console.log('Sending payload:', payload);

    const response = await fetch('/api/getFinancialAdvice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to get financial advice: ${response.status}`);
    }

    const data = await response.json();
    return data.advice;
  } catch (error) {
    console.error('Error in getFinancialAdvice:', error);
    return "Unable to generate financial advice at the moment.";
  }
}