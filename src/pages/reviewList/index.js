import React from 'react'
import { Col, Row } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import stockImage from '../../assets/stock.png';
import { deleteReview } from '../../redux/actions/review';
import { showToastMessage } from '../../redux/actions/toastNotification';


const ReviewList = () => {
    const {reviews} = useSelector(state => state.reviewReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        dispatch(deleteReview(id))
        dispatch(showToastMessage("Your review delete successfully.", 'success'))
    }

    const handleEdit = (id) => {
        navigate('/'+ id)
    }

  return (
    <div className=' review-list'>
        <h6 className='my-3'>All reviews</h6>
            {reviews.map((item) => (
            <div key={item.id + 'review-list'} className='card review-list-card'>
                    <Row>
                        <Col sm="2">
                            <img src={stockImage}/>
                        </Col>
                        <Col sm="9">
                            <h6 className='mb-1'>{item.name}</h6>
                            <p className='mb-1'>{item.email}</p>
                            <b>{item.phone}</b> 
                        </Col>
                    </Row>
                    <ReactStars
                            count={5}
                            size={30}
                            value={item.rating}
                            isHalf={true}
                            edit={false}
                            activeColor="#ffd700"
                        />
                    <p>{item.comment}</p>
                    <div className=''>
                        <button onClick={() => handleEdit(item?.id)} className='btn btn-primary mx-1'>Edit</button>
                        <button onClick={() => handleDelete(item?.id)} className='btn btn-danger'>Delete</button>
                    </div>
            </div>
            ))}
    </div>
  )
}

export default ReviewList