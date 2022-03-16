import { firebase, FieldValue } from "../lib/firebase";

// console.log("yes1");
// firebase
//   .firestore()
//   .collection("users")
//   .where("followers", "==", ["2"])
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log("yes2");
//       console.log(doc.id, " => ", doc.data());
//     });
//   });

// firebase
//   .firestore()
//   .collection("users")
//   .doc("EJF0T0ZBvr8MNGAKicJK")
//   .get()
//   .then((i) => {
//     console.log(i.data());
//   });
export async function createNewUserDocument(
  id,
  userName,
  fullName,
  emailAddress
) {
  try {
    const result = await firebase
      .firestore()
      .collection("users")
      .add({
        userId: id,
        username: userName.toLowerCase(),
        fullName: fullName,
        emailAddress: emailAddress.toLowerCase(),
        following: [],
        followers: [],
        dateCreated: Date.now(),
        avatar: { avatarURL: "", fileName: "" },
      });
    if (result) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

export async function DoesUsernameExist(name) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", name)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

//  get user from firestore where userId === userId (passed from auth)
export async function GetUserById(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user[0];
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // currently logged in user document id
  profileId, // the user that request to follow
  isFollowingProfile // ture/false can i currently following this person?
) {
  // console.log(profileId, loggedInUserDocId);
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  profileDocId, // the user that request to follow
  loggedInUserDocId, // currently logged in user document id
  isFollowingProfile // ture/false can i currently following this person?
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const user = await GetUserById(photo.userId);
      // const { username } = user[0]; // try this if error occured
      const { username } = user;

      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function getUserPhotosByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  return photos;
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername) // karl (active logged in user)
    .where("following", "array-contains", profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  // 1st param: karl's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  );

  // 1st param: karl's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}

export async function updateUserStoriesList(
  userId,
  addStory,
  downloadURL,
  startTime
) {
  if (addStory) {
    let userName = "";
    let data = await firebase
      .firestore()
      .collection("users")
      .where("userId", "==", userId)
      .get();
    if (data) {
      data = data.docs.map((item) => item.data());
      let [res] = data;
      userName = res.username;
    }
    if (userName === "") {
      userName = "user";
    }
    if (userName !== "") {
      await firebase.firestore().collection("stories").doc(userId).set({
        start: startTime,
        url: downloadURL,
        username: userName,
      });
    }
  }
}

export async function uploadStories(file, filepath, userId, startTime) {
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storageRef = firebase.storage().ref();
  //  Create a child
  const imagesRef = storageRef.child(filepath);
  // imagesRef now points to 'images'
  const uploadTask = imagesRef.put(file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      // on complte upload task
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        // update user stories list
        let addStory = true;
        updateUserStoriesList(userId, addStory, downloadURL, startTime);
        return downloadURL;
      });
    }
  );
}

export async function getUploadedStory(userId) {
  console.log("nooo");
  try {
    const result = await firebase
      .firestore()
      .collection("stories")
      .doc(userId)
      .get();
    return result.data();
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

export async function deleteExpireStories(deleteStories) {
  deleteStories.forEach(async (story) => {
    await firebase.firestore().collection("stories").doc(story.docId).delete();
  });
}
export async function deleteExpireStoriesImages(deleteStories) {
  deleteStories.forEach(async (story) => {
    await firebase
      .storage()
      .ref()
      .child(`images/${String(story.start)}.jpg`)
      .delete();
  });
}

export async function getAllStories() {
  try {
    const result = await firebase.firestore().collection("stories").get();
    if (result) {
      let res = result.docs.map((item) => ({ ...item.data(), docId: item.id }));
      let end = new Date().getTime();
      let deleteStories = res.filter((item) => {
        console.log(Math.round((end - item.start) / (1000 * 60 * 60)));
        if (Math.round((end - item.start) / (1000 * 60 * 60)) >= 1) {
          return item;
        }
        return null;
      });
      if (deleteStories) {
        // delete stories' images from storage
        deleteExpireStoriesImages(deleteStories);
        // delete stories data  from firestore
        deleteExpireStories(deleteStories);
      }
      return res;
    }
  } catch (err) {
    console.log(err.message);
  }
}

export async function getAllStoriesExceptUserUploadedStory(userId) {
  console.log("yesss");
  try {
    let result = await firebase.firestore().collection("stories").get();
    if (result) {
      let res = result.docs.map((item) => ({ ...item.data(), docId: item.id }));
      if (res) {
        res = res.filter((item) => item.docId !== userId);
      }
      return res;
    }
  } catch (err) {
    console.log(err.message);
  }
}

export async function updatePostList(
  userId,
  downloadURL,
  createdTime,
  caption,
  links
) {
  console.log(caption, links);
  try {
    // here photos -> post
    await firebase
      .firestore()
      .collection("photos")
      .add({
        caption: caption,
        links: links,
        comments: [],
        dateCreated: Number(createdTime),
        imageSrc: downloadURL,
        likes: [],
        photoId: Number(createdTime),
        userId: userId,
      });
  } catch (err) {
    console.log(err.message);
  }
}

export async function uploadPost(file, filepath, userId, time, caption, links) {
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storageRef = firebase.storage().ref();
  //  Create a child
  const imagesRef = storageRef.child(filepath);
  // imagesRef now points to 'images
  const uploadTask = imagesRef.put(file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      // on complte upload task
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        // update  post list
        // let addPost = true;
        updatePostList(userId, downloadURL, time, caption, links);
        return downloadURL;
      });
    }
  );
}

export async function updateProfile(userName, bioData) {
  let id = "";
  try {
    await firebase
      .firestore()
      .collection("users")
      .where("username", "==", userName)
      .get()
      .then((items) => {
        items.docs.map((doc) => {
          id = doc.id;
        });
        // });
      });
    if (id !== "") {
      await firebase
        .firestore()
        .collection("users")
        .doc(id)
        .update({ bio: bioData });
    }
  } catch (err) {
    console.log(err.message);
  }
}
