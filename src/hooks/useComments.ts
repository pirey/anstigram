import { useEffect, useState } from 'react'

const COMMENTS_LS_KEY = 'comments'

interface CommentsByPhotoId {
  [photoId: number]: string[]
}

export default function useComments(photoId: number) {
  // represents all comments for all photos
  const [commentsByPhotoId, setCommentsByPhotoId] = useState<CommentsByPhotoId>(
    {}
  )

  // represents all comments for current photo id
  const [photoComments, setPhotoComments] = useState<string[]>([])

  useEffect(() => {
    try {
      const commentsByPhotoId = JSON.parse(
        localStorage.getItem(COMMENTS_LS_KEY) || '{}'
      )
      const comments = commentsByPhotoId[photoId] || []
      setPhotoComments(comments)
      setCommentsByPhotoId(commentsByPhotoId)
    } catch (_e) {
      setPhotoComments([])
    }
  }, [photoId])

  const addComment = (comment: string) => {
    // add new comment to state and store
    const newPhotoComments = photoComments.concat(comment)
    setPhotoComments(newPhotoComments)
    commentsByPhotoId[photoId] = newPhotoComments
    setCommentsByPhotoId(commentsByPhotoId)

    localStorage.setItem(COMMENTS_LS_KEY, JSON.stringify(commentsByPhotoId))
  }

  const removeComment = (comment: string, index: number) => {
    // add new comment to state and store
    const newPhotoComments = photoComments.filter((comment_, index_) => {
      if (index_ === index && comment_ === comment) {
        return false
      }

      return true
    })
    setPhotoComments(newPhotoComments)
    commentsByPhotoId[photoId] = newPhotoComments
    setCommentsByPhotoId(commentsByPhotoId)

    localStorage.setItem(COMMENTS_LS_KEY, JSON.stringify(commentsByPhotoId))
  }

  return [photoComments, addComment, removeComment] as const
}
