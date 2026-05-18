// Keep using localhost for local testing
const API_BASE_URL = 'http://localhost:8000';
export const scoringService = {
    getHeaders() {
        const token = localStorage.getItem('impakto_msme_token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    },
    /**
     * Fetch the live Trust Score.
     * The backend will automatically recalculate it when this is called.
     */
    async getMyScore() {
        const response = await fetch(`${API_BASE_URL}/api/scoring/my-score`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch trust score');
        }
        return response.json();
    }
};
