import React from 'react'
import { ReviewCompany } from 'src/Custom/interfaces'
import { ConceptsView } from 'src/components/pages/Concepts/View'

type ReviewsPageViewProps = {
  reviews: ReviewCompany[]
  count: number
  page: number
  limit: number
}

export const ReviewsPageView: React.FC<ReviewsPageViewProps> = ({
  reviews,
  count,
  limit,
  page,
}) => {
  return (
    <ConceptsView concepts={reviews} count={count} page={page} limit={limit} />
  )
}
