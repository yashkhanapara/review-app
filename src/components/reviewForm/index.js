import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {addReview, editReview} from '../../redux/actions/review';
import {showToastMessage} from '../../redux/actions/toastNotification';
import ShortUniqueId from 'short-unique-id';
import {useNavigate, useParams} from 'react-router-dom';

const ReviewForm = () => {
    const params = useParams();
    const {reviews} = useSelector((state) => state.reviewReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uid = new ShortUniqueId();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            rating: 0,
            comment: '',
            id: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Field is required'),
            email: Yup.string().email('Invalid email address').required('Field is required'),
            phone: Yup.string()
                .min(10, 'Phone Number must be 10 characters')
                .max(10, 'Phone Number must be 10 characters')
                .required('Field is required'),
            rating: Yup.number().required('Field is required'),
        }),
        onSubmit: (values, {resetForm}) => {
            if (params.id) {
                dispatch(editReview(values));
                navigate('/review-list');
                dispatch(showToastMessage('Your review update successfully.', 'success'));
            } else {
                let val = values;
                val['id'] = uid();
                dispatch(addReview(val));
                dispatch(showToastMessage('Your review submit successfully.', 'success'));
            }
            resetForm();
            setFieldValue('rating', 0);
        },
    });

    useEffect(() => {
        if (params.id) {
            const filterReview = reviews.filter((item) => item.id === params.id)?.[0];
            formik.setFieldValue('name', filterReview.name);
            formik.setFieldValue('email', filterReview.email);
            formik.setFieldValue('phone', filterReview.phone);
            formik.setFieldValue('rating', filterReview.rating);
            formik.setFieldValue('id', filterReview.id);
            formik.setFieldValue('comment', filterReview.comment);
        }
    }, [params]);

    const {handleChange, handleBlur, values, errors, touched, handleSubmit, setFieldValue} = formik;

    return (
        <div>
            <div className='review-card card'>
                <h4>{params.id ? 'Update' : 'Submit'} Your Review</h4>
                <form onSubmit={handleSubmit} className='review-form'>
                    <Row>
                        <Col sm='6'>
                            <div className='form-field'>
                                <input
                                    type={'text'}
                                    className='form-control'
                                    name='name'
                                    placeholder='Full Name'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                {errors.name && touched.name && (
                                    <small className='text-danger'>{errors.name}</small>
                                )}
                            </div>
                        </Col>
                        <Col sm='6'>
                            <div className='form-field'>
                                <input
                                    type='number'
                                    className='form-control'
                                    name='phone'
                                    placeholder='Contact Number'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                />
                                {errors.phone && touched.phone && (
                                    <small className='text-danger'>{errors.phone}</small>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <div className='form-field'>
                        <input
                            type={'email'}
                            className='form-control'
                            name='email'
                            placeholder='Email Address'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && (
                            <small className='text-danger'>{errors.email}</small>
                        )}
                        {/* {errors.email.valid && touched.email && <small>{errors.email}</small>} */}
                    </div>
                    <div className='form-field'>
                        <label>Your Rating</label>
                        <ReactStars
                            count={5}
                            onChange={(rat) => setFieldValue('rating', rat)}
                            size={30}
                            value={values.rating}
                            isHalf={true}
                            activeColor='#ffd700'
                        />
                    </div>
                    <div className='form-field'>
                        <textarea
                            placeholder='Your Comment'
                            className='form-control'
                            name='comment'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.comment}
                        />
                    </div>
                    <div>
                        <button type='submit' className='submit-button'>
                            {params.id ? 'Update' : 'Submit'} Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;
