import { useQuery } from '@tanstack/react-query';

export function useLedgerEntries(userId: number) {
  return useQuery({
    queryKey: ['ledger', userId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/api/ledger/history`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
    // This tells TanStack query to pause the request and serve cache if the device loses internet
    networkMode: 'offlineFirst', 
  });
}