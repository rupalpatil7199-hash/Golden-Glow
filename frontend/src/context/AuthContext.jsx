import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClerkProvider, SignedIn as ClerkSignedIn, SignedOut as ClerkSignedOut, useUser as useClerkUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

const AuthContext = createContext(null);

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Mock user profiles
const mockProfiles = {
  customer: {
    id: 'user_customer_67890',
    fullName: 'Eleanor Vance',
    firstName: 'Eleanor',
    lastName: 'Vance',
    primaryEmailAddress: { emailAddress: 'buyer@goldenglow.com' },
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    publicMetadata: { role: 'customer' }
  },
  admin: {
    id: 'user_admin_12345',
    fullName: 'Alexander Thorne',
    firstName: 'Alexander',
    lastName: 'Thorne',
    primaryEmailAddress: { emailAddress: 'admin@goldenglow.com' },
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    publicMetadata: { role: 'admin' }
  }
};

export const CustomAuthProvider = ({ children }) => {
  // If Clerk key is present, wrap the app in ClerkProvider
  if (clerkPubKey && clerkPubKey !== "your_clerk_publishable_key") {
    return (
      <ClerkProvider publishableKey={clerkPubKey}>
        <ClerkBridge>{children}</ClerkBridge>
      </ClerkProvider>
    );
  }

  // Fallback Mock Auth Provider
  return <MockAuthProvider>{children}</MockAuthProvider>;
};

// Clerk Bridge to unify context
const ClerkBridge = ({ children }) => {
  const { user } = useClerkUser();
  const { getToken, signOut } = useClerkAuth();
  const [role, setRole] = useState('customer');

  useEffect(() => {
    if (user) {
      // In Clerk, role is usually in publicMetadata
      const userRole = user.publicMetadata?.role || 'customer';
      setRole(userRole);
    }
  }, [user]);

  const value = {
    isClerk: true,
    user: user ? {
      clerkId: user.id,
      fullName: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
      avatar: user.imageUrl,
      role: role
    } : null,
    getToken: async () => getToken(),
    logout: signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Local Auth implementation (previously MockAuthProvider)
const MockAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user profile on boot if token exists
  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = localStorage.getItem('goldenglow_token');
      if (token) {
        try {
          const res = await fetch('/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await res.json();
          if (data.success) {
            setCurrentUser(data.user);
          } else {
            localStorage.removeItem('goldenglow_token');
          }
        } catch (err) {
          console.error('Failed to load profile on bootstrap:', err);
        }
      }
      setLoading(false);
    };
    bootstrapAuth();
  }, []);

  const login = async (emailOrRole, password) => {
    let email = emailOrRole;
    let pass = password;

    // Developer demo shortcut support
    if (emailOrRole === 'customer') {
      email = 'buyer@goldenglow.com';
      pass = 'password123';
    } else if (emailOrRole === 'admin') {
      email = 'admin@goldenglow.com';
      pass = 'password123';
    }

    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });
    
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem('goldenglow_token', data.token);
    setCurrentUser(data.user);
    return data;
  };

  const register = async (fullName, email, password) => {
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password })
    });
    
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    localStorage.setItem('goldenglow_token', data.token);
    setCurrentUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('goldenglow_token');
    setCurrentUser(null);
  };

  const getToken = async () => {
    return localStorage.getItem('goldenglow_token');
  };

  const value = {
    isClerk: false,
    user: currentUser,
    loading,
    login,
    register,
    logout,
    getToken
  };

  // Prevent layout flicker while initializing token session
  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090b] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#c9b067] border-r-2 border-r-transparent"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthBridge = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthBridge must be used within CustomAuthProvider');
  }
  return context;
};

// Conditional wrappers that mirror Clerk elements
export const SignedIn = ({ children }) => {
  const auth = useAuthBridge();
  if (auth.isClerk) {
    return <ClerkSignedIn>{children}</ClerkSignedIn>;
  }
  return auth.user ? <>{children}</> : null;
};

export const SignedOut = ({ children }) => {
  const auth = useAuthBridge();
  if (auth.isClerk) {
    return <ClerkSignedOut>{children}</ClerkSignedOut>;
  }
  return !auth.user ? <>{children}</> : null;
};
