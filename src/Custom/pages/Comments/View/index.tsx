import React from 'react'
import { Comment } from 'src/Custom/interfaces'
import { ConceptsView } from 'src/components/pages/Concepts/View'

type CommentsPageViewProps = {
  comments: Comment[]
  count: number
  page: number
  limit: number
}

export const CommentsPageView: React.FC<CommentsPageViewProps> = ({
  comments,
  count,
  limit,
  page,
}) => {
  return (
    <ConceptsView concepts={comments} count={count} page={page} limit={limit} />
  )
}
