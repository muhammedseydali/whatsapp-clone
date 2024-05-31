import { getDoc, doc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase'; // Ensure you import your Firebase instance

// Define the user store using Zustand
export const userStore = create((set) => ({
  currentUser: null,
  isLoading: true,

  // Define the fetchUserInfo function to fetch user information
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.log(err);
      return set({ currentUser: null, isLoading: false });
    }
  }
}));

export default userStore;
export { userStore as useUserStore };
