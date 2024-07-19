import util from '@/util/util';
import { db } from './firebase'
import { ref, set, get, child } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

const getUuid = () => {
    const uuid = uuidv4();
    const tokens = uuid.split('-')
    return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
}

export async function writePost({ userId, title, content }: Post) {
  const id = getUuid()
  const now = util.getFormattedCurrentDateTime()
  set(ref(db, `posts/${id}`), {
    // id: randomUUID,
    userId: userId,
    title: title,
    content: content,
    createdAt: now,
    updatedAt: now,
  });
}

export async function getPostById(id: string) {
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
  }
  
  export async function getPostListByUserId(userId: string) {
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
  }
  