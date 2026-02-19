import { useQuery } from '@tanstack/react-query';

export function usePortfolio() {
  return useQuery({
    queryKey: ['portfolio_metrics'],
    queryFn: async () => {
      // In a real scenario, this would fetch from a dedicated MFI portfolio endpoint.
      // For now, we'll fetch the ledger history as a placeholder for the portfolio.
      const response = await fetch(`http://localhost:8000/api/mfi/portfolio`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
    // Poll the backend every 30 seconds to update the MFI's view automatically
    refetchInterval: 30000, 
  });
}