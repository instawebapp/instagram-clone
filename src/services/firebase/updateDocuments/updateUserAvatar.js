import { firebase } from "../../../lib/firebase";

export async function updateUserAvatar(
  file,
  locationPath,
  fileName,
  userId,
  collectionName
) {
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storageRef = firebase.storage().ref();
  //  Create a child
  const imagesRef = storageRef.child(locationPath);
  // imagesRef now points to 'images'
  const uploadTask = imagesRef.put(file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      // on complete upload task
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        updateUserDoc(fileName, userId, collectionName, downloadURL);
        console.log(downloadURL);
        return downloadURL;
      });
    }
  );
}

export async function updateUserDoc(
  fileName,
  userId,
  collectionName,
  avatarURL
) {
  try {
    await firebase
      .firestore()
      .collection(collectionName)
      .where("userId", "==", userId)
      .get()
      .then((item) => item.docs.map((item) => item.id))
      .then(([id]) => {
        firebase
          .firestore()
          .collection(collectionName)
          .doc(id)
          .update({ avatar: { avatarURL: avatarURL, fileName: fileName } });
      });
  } catch (err) {
    console.log(err);
  }
}
