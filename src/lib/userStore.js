import { getDoc } from 'firebase/firestore';
import { create } from 'zustand'

export const userStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchuserInfo : async (uid) => {
    if(!uid) return set({ currentUser: null, isLoading: false});

    try{

        const docRef = doc(db , "users" , uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            set({currentuser: docSnap.data(), isLoading:false});
        } else{
            set({currentUser:null, isLoading:false});
        }

    }catch(err){
        console.log(err)
        return set({ currentUser:null , isLoading:false})
    }
  } 
}))
export default user;
