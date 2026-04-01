// Define the exact shapes of our data so TypeScript can catch errors
export interface TransactionData {
  amount: number;
  transaction_type: 'INCOME' | 'EXPENSE';
  category: string;
  transaction_date: string; // Format: YYYY-MM-DD
  description?: string;
}

export interface TransactionResponse extends TransactionData {
  id: number;
  created_at: string;
}

// NOTE: Change this to 'https://impakto.systems' when you push to production!
const API_BASE_URL = 'http://localhost:8000'; 

export const ledgerService = {
  /**
   * Helper to get the auth token and format the headers
   */
  getHeaders() {
    const token = localStorage.getItem('impakto_msme_token');
    
    // DEBUG: Print to the browser console to see exactly what is being grabbed
    console.log("DEBUG - Extracted Token:", token); 
    
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // This tells Django exactly who is logged in
    };
  },

  /**
   * Upload an image of a ledger to the Impakto AI for extraction.
   * Returns the structured JSON data without saving it to the database yet.
   */
  async digitizeImage(file: File): Promise<TransactionData> {
    const formData = new FormData();
    formData.append('file', file); // 'file' must match the parameter name in your Django api.py

    const token = localStorage.getItem('impakto_msme_token');
    
    // Note: When sending FormData, DO NOT set the 'Content-Type' header!
    // The browser will automatically set it to 'multipart/form-data' with the correct boundaries.
    const response = await fetch(`${API_BASE_URL}/api/ledger/digitize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}` 
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text(); // Grab the raw HTML/Text
      console.error("DJANGO CRASH DATA:", errorText); // Print it to browser console
      
      try {
        // Try to parse it just in case it actually is JSON
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.detail || 'Failed to analyze the image.');
      } catch (e) {
        // If it fails to parse, it means Django sent an HTML crash page
        throw new Error('Server crashed! Please check your Django terminal for the exact Python error.');
      }
    }

    return response.json();
  },

  /**
   * Log a new sale or expense
   */
  async createTransaction(data: TransactionData): Promise<TransactionResponse> {
    const response = await fetch(`${API_BASE_URL}/api/ledger/activity`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to create transaction');
    }

    return response.json();
  },

  /**
   * Retrieve the MSME's transaction history
   */
  async getTransactions(): Promise<TransactionResponse[]> {
    const response = await fetch(`${API_BASE_URL}/api/ledger/activity`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch ledger history');
    }

    return response.json();
  }
};