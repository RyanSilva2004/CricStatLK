export const addPerformance = async (performanceData: any) => {
  const response = await fetch('http://localhost:8080/api/performances', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(performanceData),
  });

  if (!response.ok) {
    throw new Error('Failed to add performance');
  }

  return response.json();
};
