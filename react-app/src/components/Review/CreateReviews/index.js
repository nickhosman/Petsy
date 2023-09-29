import ReviewForm from "../ReviewForm"

const CreateReview = () => {
  const review = {
    stars: 0,
    details: ''

  }

  return (
    <ReviewForm
      review={review}
      formType='Create A Review'
    />
  )
}

export default CreateReview
