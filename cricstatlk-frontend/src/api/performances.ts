export const postPerformance = async (performance: any) => {
  const response = await fetch('http://localhost:8080/api/performance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(performance),
  });
  return await response.json();
};