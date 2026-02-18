interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-sm w-full max-w-md border border-gray-200">
        <h1 className="mb-6">Impakto MFI Officer Portal</h1>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 text-sm text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="jean-paul@impakto.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          
          <button
            onClick={onLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
