const API_BASE_URL = 'http://localhost:8000';
const getHeaders = () => {
    const token = localStorage.getItem('impakto_msme_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};
export const loansService = {
    checkLoanEligibility: async () => {
        const response = await fetch(`${API_BASE_URL}/api/loans/eligibility`, {
            method: 'GET',
            headers: getHeaders(),
        });
        if (!response.ok)
            throw new Error('Failed to fetch eligibility');
        return response.json();
    },
    applyForLoan: async (requested_amount) => {
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
    getActiveLoan: async () => {
        const response = await fetch(`${API_BASE_URL}/api/loans/active`, {
            method: 'GET',
            headers: getHeaders(),
        });
        if (response.status === 404)
            return null;
        if (!response.ok)
            throw new Error('Failed to fetch active loan');
        return response.json();
    },
    repayLoan: async (loan_id, amount) => {
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
