const API_BASE_URL = 'http://localhost:8000';
export const kycService = {
    async extractId(file) {
        const formData = new FormData();
        formData.append('file', file);
        const token = localStorage.getItem('impakto_msme_token');
        const response = await fetch(`${API_BASE_URL}/api/auth/kyc/extract-id`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });
        if (!response.ok) {
            const errorText = await response.text();
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            }
            catch (e) {
                throw new Error('Server crashed! Please check the Django terminal.');
            }
            // THE FIX: The throw is now safely outside the try/catch block!
            throw new Error(errorData.detail || 'Failed to read ID card.');
        }
        return response.json();
    },
    async matchFaces(idFile, selfieFile) {
        const formData = new FormData();
        formData.append('id_image', idFile);
        formData.append('selfie_image', selfieFile);
        const token = localStorage.getItem('impakto_msme_token');
        const response = await fetch(`${API_BASE_URL}/api/auth/kyc/match-faces`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });
        if (!response.ok) {
            const errorText = await response.text();
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            }
            catch (e) {
                throw new Error('Server crashed during biometric analysis.');
            }
            // THE FIX: The throw is now safely outside the try/catch block!
            throw new Error(errorData.detail || 'Failed to match faces.');
        }
        return response.json();
    }
};
