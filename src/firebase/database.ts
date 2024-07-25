import util from "@/util/util"
import { db } from "./firebase"
import {
  ref,
  set,
  get,
  child,
  update,
  remove,
  orderByChild,
  query,
  equalTo,
} from "firebase/database"
import { v4 as uuidv4 } from "uuid"
import { loadingActions, store } from "@/components/LoadingState"

const getUuid = () => {
  const uuid = uuidv4()
  const tokens = uuid.split("-")
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4]
}

export const postModel = {
  async writePost({ userId, title, content }: Post) {
    const id = getUuid()
    const now = new Date()
    const nowStr = util.getFormattedDateTime(now)
    const nowStamp = util.getDateTimeStamp(now)
    set(ref(db, `posts/${id}`), {
      id: id,
      userId: userId,
      title: title,
      content: content,
      createdAt: nowStr,
      updatedAt: nowStr,
      createdAtTimeStamp: nowStamp,
    })
  },

  async getPostById(id: string) {
    store.dispatch(loadingActions.loading())
    const result = await get(child(ref(db), `posts/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val()
        } else {
          console.log("No data available")
        }
      })
      .catch((error) => {
        console.error(error)
      })
    store.dispatch(loadingActions.complete())
    return result
  },

  async getPostListByUserId(userId: string) {
    store.dispatch(loadingActions.loading())
    try {
      const snapshot = await get(
        query(ref(db, "posts"), orderByChild("userId"), equalTo(userId))
      )
      return Object.values(snapshot.val())
    } catch (error) {
      console.log(error)
    } finally {
      store.dispatch(loadingActions.complete())
    }
  },

  async getPostList() {
    store.dispatch(loadingActions.loading())
    try {
      const snapshot = await get(
        query(ref(db, "posts"), orderByChild("createdAtTimeStamp"))
      )
      return snapshot.exists() ? Object.values(snapshot.val()) : []
    } catch (error) {
      console.log(error)
    } finally {
      store.dispatch(loadingActions.complete())
    }
  },

  async updatePost(post: Post) {
    try {
      return await update(ref(db, `/posts/${post.id}`), {
        ...post,
        updatedAt: util.getFormattedCurrentDateTime(),
      })
    } catch (error) {
      console.log(error)
    }
  },
  async deletePostById(postId: string) {
    try {
      return await remove(ref(db, `/posts/${postId}`))
    } catch (error) {
      console.log(error)
    }
  },
}
