// import { createContext, useContext, useState, useEffect } from 'react';
// import { 
//   getAuth, 
//   onAuthStateChanged, 
//   signOut as firebaseSignOut,
//   sendPasswordResetEmail,
//   confirmPasswordReset,
//   verifyPasswordResetCode
// } from 'firebase/auth';
// import app from '../firebase';
// import { toast } from 'react-toastify';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [resetEmailSent, setResetEmailSent] = useState(false);
//     const [resetEmail, setResetEmail] = useState('');
//     const auth = getAuth(app);

//     // Handle user state changes
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setCurrentUser(user);
//             setLoading(false);
//         });

//         return unsubscribe; // Cleanup subscription
//     }, [auth]);

//     // Sign out function
//     const signOut = async () => {
//         try {
//             await firebaseSignOut(auth);
//             setCurrentUser(null);
//         } catch (error) {
//             console.error("Error signing out:", error);
//             toast.error("Failed to sign out");
//         }
//     };

//     // Forgot password function
//     const forgotPassword = async (email) => {
//         try {
//             await sendPasswordResetEmail(auth, email);
//             setResetEmailSent(true);
//             setResetEmail(email);
//             toast.success("Password reset email sent. Please check your inbox.");
//             return true;
//         } catch (error) {
//             let errorMessage = "Failed to send reset email";
            
//             switch (error.code) {
//                 case 'auth/user-not-found':
//                     errorMessage = "No user found with this email address";
//                     break;
//                 case 'auth/invalid-email':
//                     errorMessage = "Invalid email address format";
//                     break;
//                 case 'auth/too-many-requests':
//                     errorMessage = "Too many requests. Please try again later";
//                     break;
//                 default:
//                     errorMessage = error.message;
//             }
            
//             toast.error(errorMessage);
//             return false;
//         }
//     };

//     // Verify password reset code
//     const verifyResetCode = async (code) => {
//         try {
//             const email = await verifyPasswordResetCode(auth, code);
//             return email;
//         } catch (error) {
//             console.error("Error verifying reset code:", error);
//             toast.error("Invalid or expired reset code");
//             return null;
//         }
//     };

//     // Confirm password reset
//     const confirmReset = async (code, newPassword) => {
//         try {
//             await confirmPasswordReset(auth, code, newPassword);
//             toast.success("Password reset successfully. You can now login with your new password.");
//             return true;
//         } catch (error) {
//             console.error("Error resetting password:", error);
//             toast.error("Failed to reset password. The link may have expired.");
//             return false;
//         }
//     };

//     const value = {
//         currentUser,
//         loading,
//         resetEmailSent,
//         resetEmail,
//         signOut,
//         forgotPassword,
//         verifyResetCode,
//         confirmReset
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };


import { createContext, useState, useEffect } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details from backend
  const fetchUserDetails = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user-details', {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check auth state on initial load
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Context.Provider value={{ 
      user,
      loading,
      login,
      logout,
      fetchUserDetails
    }}>
      {!loading && children}
    </Context.Provider>
  );
};