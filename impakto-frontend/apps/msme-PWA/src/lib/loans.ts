export interface LoanEligibility {
  is_eligible: boolean;
  max_amount: number;
  interest_rate: number;
  repayment_duration_days: number;
  reason?: string;
}

export interface Loan {
  id: number;
  principal_amount: number;
  interest_rate: number;
  repayment_duration_days: number;
  status: 'PENDING' | 'APPROVED' | 'ACTIVE' | 'REPAID' | 'DEFAULTED';
  outstanding_balance: number;
  disbursed_at: string | null;
  due_date: string | null;
  created_at: string;
}

const API_BASE_URL = 'http://localhost:8000';

const getHeaders = () => {
  const token = localStorage.getItem('impakto_msme_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const loansService = {
  checkLoanEligibility: async (): Promise<LoanEligibility> => {
    const response = await fetch(`${API_BASE_URL}/api/loans/eligibility`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch eligibility');
    return response.json();
  },

  applyForLoan: async (requested_amount: number): Promise<Loan> => {
    const response = await fetch(`${API_BASE_URL}/api/loans/apply`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ requested_amount }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to apply for loan');
    }
    return response.json();
  },

  getActiveLoan: async (): Promise<Loan | null> => {
    const response = await fetch(`${API_BASE_URL}/api/loans/active`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Failed to fetch active loan');
    return response.json();
  },

  repayLoan: async (loan_id: number, amount: number): Promise<Loan> => {
    const response = await fetch(`${API_BASE_URL}/api/loans/${loan_id}/repay`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to process repayment');
    }
    return response.json();
  }
};
