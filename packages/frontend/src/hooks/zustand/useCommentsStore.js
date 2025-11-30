import { create } from "zustand";

const useCommentStore = create((set)=> {
  return {
    comments: null,
    updateComments: (comments)=> set({comments})
  }
})

export default useCommentStore