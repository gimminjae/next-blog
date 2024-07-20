import util from '@/util/util';
import { db } from './firebase'
import { ref, set, get, child, update, remove } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

const getUuid = () => {
    const uuid = uuidv4();
    const tokens = uuid.split('-')
    return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
}

export const postModel = {
    async writePost({ userId, title, content }: Post) {
        const id = getUuid()
        const now = util.getFormattedCurrentDateTime()
        set(ref(db, `posts/${id}`), {
          id: id,
          userId: userId,
          title: title,
          content: content,
          createdAt: now,
          updatedAt: now,
        });
      },
      
      async getPostById(id: string) {
          const result = await get(child(ref(db), `posts/${id}`)).then((snapshot) => {
              if (snapshot.exists()) {
                return snapshot.val()
              } else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            });
            return result
        },
        
        async getPostListByUserId(userId: string) {
          const result = await get(child(ref(db), `posts/${userId}`)).then((snapshot) => {
              if (snapshot.exists()) {
                return snapshot.val()
              } else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            });
            return result
        },
      
        async getPostList() {
          try {
              const snapshot = await get(ref(db, 'posts'))
              return snapshot.exists() ? Object.values(snapshot.val()) : []
          } catch (error) {
              console.log(error)
          }
        },

        async updatePost(post: Post) {
            try {
                return await update(ref(db, `/posts/${post.id}`), post)
            } catch (error) {
                console.log(error)
            }
          },
          async deletePostById(postId: string) {
            try {
                return await remove(ref(db, `/posts/${postId}`));
            } catch (error) {
                console.log(error)
            }
          }
}