import { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Our Django schema expects 'username' and 'password'
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === 'mfi_officer') {
          // Store the JWT token securely in localStorage
          localStorage.setItem('impakto_token', data.token);
          // Optional: Store the employee ID for the dashboard
          if (data.employee_id) localStorage.setItem('employee_id', data.employee_id);
          
          onLogin(); // Proceed to the dashboard
        } else {
          setError('Access denied. This portal is for MFI Officers only.');
        }
      } else {
        setError(data.detail || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Failed to connect to the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Impakto MFI Portal</h1>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="impaktoadmin"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}