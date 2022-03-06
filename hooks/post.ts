import { useEffect, useState } from "react";
import postService from "services/postService";
import { IPost } from "services/typing";

export const usePosts = (initialPosts?: IPost[]) => {
  const [posts, setPosts] = useState<IPost[]>(initialPosts || []);
  useEffect(() => {
    const unsubscribe = postService.subscribe(setPosts);
    return () => {
      unsubscribe();
    };
  }, [setPosts]);
  return [posts] as const;
};
