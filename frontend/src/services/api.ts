const API_URL =
  import.meta.env.PROD
    ? "https://lolbot-o5dx.onrender.com"
    : "http://localhost:3000";

export async function chatMessage(message: string): Promise<string> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data.reply;
}

export async function echoMessage(message: string): Promise<string> {
  const response = await fetch(`${API_URL}/echo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  
  const data = await response.json();
  return data.message;
}
