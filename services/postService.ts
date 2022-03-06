import { collection, doc, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "utils/firebase";
import { IPost } from "./typing";

const postService = {
  getPosts: async () => {
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
    return posts;
  },

  subscribe: (onChange: (posts: IPost[]) => void) => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      onChange(posts);
    });
    return unsubscribe;
  },
};

export default postService;
