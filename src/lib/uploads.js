
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const upload = async (file) =>{

    const date = new Date()


const storage = getStorage();
const storageRef = ref(storage, `images/${date + file.name}`);

return new Promis((resolve, reject) => {

    
    const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  }, 
  (error) => {
    reject("something went wrong!!!"+ error.code)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      resolve(downloadURL)
    });
}
);
    });

};

export default upload