import { CRow, CCol, CButton, CCard, CCardBody } from '@coreui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { createSubscriptionAsync, editSubscriptionAsync, fetchedSubscriptions, getSubscriptionAsync, selectedSubscription } from './SubscriptionSlice'

const SubscriptionForm = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const Navigate = useNavigate()
  const [initialValue, setInitialValue] = useState({
    name: '',
    duration: '',
    amount: '',
    startDate:null ,
    endDate:null ,
  })

  const subscriptions = useSelector(fetchedSubscriptions)
  const selected = useSelector(selectedSubscription)

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    try {
      if (id) {
        dispatch(editSubscriptionAsync({ values, id: id }))
        Navigate('/subscriptions')
      } else {
        dispatch(createSubscriptionAsync(values))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
      resetForm()
      setInitialValue({
         name: '',
         duration: '',
         amount: '',
         startDate:null,
         endDate:null ,
      })
      Navigate('/subscription')
    }
  }

  const validateSchema = Yup.object().shape({
   name: Yup.string().required('Language is required'),
   duration: Yup.string().required('Name is required'),
   amount: Yup.string().required('Descriptions is required'),
   startDate: Yup.string().required('Please ented sequence number'),
   endDate: Yup.string().required('Please Select status'),
  })

  useEffect(() => {
    async function fetchData() {


      if (id) {
        await dispatch(getSubscriptionAsync())
      //   await dispatch(getTopic(id))
      }
    }
    fetchData()
  }, [dispatch, id])

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4 cardStyle">
            <CCardBody>
              <CRow>
                <CCol md={9}>
                  <h6 className="heading">SUBSCRIPTIONS</h6>
                </CCol>
              </CRow>

              <CRow>
                <CCol md={12}>
                  <CCardBody className="subCardStyle">
                    <Formik
                      initialValues={
                        selected !== null
                          ? {
                           name: '',
                           duration: '',
                           amount: '',
                           startDate: null,
                           endDate: null,
                            }
                          : initialValue
                      }
                      enableReinitialize={true}
                      validationSchema={validateSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <CRow>
                            <CCol md={6}>
                              <CRow className="m-3">
                                <CCol md={6}>
                                  <label htmlFor="name">NAME</label>
                                </CCol>
                                <CCol md={6}>
                                  <Field
                                    name="name"
                                    id="name"
                                    className="rounded rounded-3 inputTag-select"
                                  >
                                  </Field>
                                </CCol>
                                <ErrorMessage name="name" component="div" className="" />
                              </CRow>

                              <CRow className="m-3">
                                <CCol md={6}>
                                  <label htmlFor="duration">NAME</label>
                                </CCol>
                                <CCol md={6}>
                                  <Field
                                  as="select"
                                    type="text"
                                    name="duration"
                                    id="duration"
                                    className="rounded rounded-3 inputTag"
                                  >
                                    <option>select duration</option>
                                    <option value="6 months">6 months</option>
                                    <option value="6 months">6 months</option>
                              
                                  </Field>
                                </CCol>
                                <ErrorMessage name="duration" component="div" className="" />
                              </CRow>

                              <CRow className="m-3">
                                <CCol md={6}>
                                  <label htmlFor="amount">AMOUNT</label>
                                </CCol>
                                <CCol md={6}>
                                  <Field
                                    type="text"
                                    name="amount"
                                    id="amount"
                                    className="rounded rounded-3 inputTag"
                                  />
                                </CCol>
                                <ErrorMessage name="amount" component="div" className="" />
                              </CRow>

                              <CRow className="m-3">
                                <CCol md={6}>
                                  <label htmlFor="startDate">START DATE</label>
                                </CCol>
                                <CCol md={6}>
                                  <Field
                                    type="date"
                                    name="startDate"
                                    id="startDate"
                                    className="rounded rounded-3 inputTag"
                                  />
                                </CCol>
                                <ErrorMessage name="startDate" component="div" className="" />
                              </CRow>

                              <CRow className="m-3">
                                <CCol md={6}>
                                  <label htmlFor="endDate">END DATE</label>
                                </CCol>
                                <CCol md={6}>
                                  <Field
                                    type="date"
                                    name="endDate"
                                    id="endDate"
                                    className="rounded rounded-3 inputTag"
                                  />
                                </CCol>
                                <ErrorMessage name="endDate" component="div" className="" />
                              </CRow>

                              <CRow className="m-3">
                                <CCol md={12}>
                                  <CRow>
                                    <CCol md={3}>
                                      <CButton type="submit" disabled={isSubmitting}>
                                        SUBMIT
                                      </CButton>
                                    </CCol>

                                    <CCol md={3}>
                                      <CButton type="submit" disabled={isSubmitting}>
                                        CANCEL
                                      </CButton>
                                    </CCol>
                                  </CRow>
                                </CCol>
                              </CRow>
                            </CCol>
                          </CRow>
                        </Form>
                      )}
                    </Formik>
                  </CCardBody>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default SubscriptionForm
