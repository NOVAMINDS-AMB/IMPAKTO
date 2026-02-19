import { useQuery } from '@tanstack/react-query';

export const useTrustScore = (userId: number) => {
  return useQuery({
    // Add the array value here to fix the syntax error
    queryKey: ['trustScore', userId],
    queryFn: async () => {
      // Wakes up and fetches the latest score from Django
      const res = await fetch(`http://127.0.0.1:8000/api/scoring/${userId}/score`);
      if (!res.ok) throw new Error('Failed to fetch score');
      return res.json();
    },
    // Refresh the score every 5 seconds (Simulating Real-Time SSE)
    refetchInterval: 5000, 
  });
};