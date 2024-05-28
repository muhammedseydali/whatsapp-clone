import { getDoc } from 'firebase/firestore';
import { create } from 'zustand'

export const chatStore = create((set) => ({
  chatId: null,
  user:null,
  isCurrentUserBlocked:false,
  isRecieverBlocked:false,
  isLoading: true,
  changeChat: (chatId, user) =>{
    const currentUser = useUserStore.getState().currentUser

    //CHECK IF USER IS BLOCKED

    if(user.blocked.includes(currentUser.id)){
        return set({
            chatId,
            user:null,
            isCurrentUserBlocked:true,
            isRecieverBlocked:false
        });
    }


    //CHECK IF RECIEVER IS BLOCKED

   else if(currentUser.blocked.includes(user.id)){
        return set({
            chatId,
            user:user,
            isCurrentUserBlocked:false,
            isRecieverBlocked:true
        });
    } else
         return set({
            chatId,
            user:user,
            isCurrentUserBlocked:false,
            isRecieverBlocked:true
        });
    }

}));