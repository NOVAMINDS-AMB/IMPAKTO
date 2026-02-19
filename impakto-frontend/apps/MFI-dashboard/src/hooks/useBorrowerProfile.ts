import { useQuery } from '@tanstack/react-query';

export const useBorrowerProfile = (grantToken: string) => {
  return useQuery({
    queryKey: ['borrowerProfile', grantToken],
    queryFn: async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/access/view-profile/${grantToken}`);
      if (!res.ok) throw new Error('Invalid or expired consent token');
      return res.json();
    },
    // We don't need to poll aggressively for the MFI dashboard
    staleTime: 60000, 
  });
};