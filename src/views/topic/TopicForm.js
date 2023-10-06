import { CContainer, CRow, CCol, CButton, CCard, CCardBody, CCardHeader, CFormSelect } from '@coreui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchedLanguages, getLanguagesAsync } from '../language/LanguageSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { createTopicAsync, editTopicAsync, getTopic, selectedTopic, getTopicAsync, } from './TopicSlice'



const TopicForm = () => {
   const dispatch = useDispatch()
   const { id } = useParams()
   const Navigate = useNavigate()
   const [initialValue, setInitialValue] = useState({
      lang_id: '',
      topic_name: '',
      descriptions: '',
      seq_no: '',
      status: '',
   })

   const languages = useSelector(fetchedLanguages)
   const selected = useSelector(selectedTopic)

   const handleSubmit = (values, { setSubmitting, resetForm }) => {
      try {
         if (id) {
            dispatch(editTopicAsync({ values, id: id }))
            Navigate('/topic')

         } else {
            dispatch(createTopicAsync(values))
         }
      } catch (error) {
         console.log(error)
      } finally {
         setSubmitting(false)
         resetForm()
         setInitialValue({
            lang_id: '',
            topic_name: '',
            descriptions: '',
            seq_no: '',
            status: '',
         })
         Navigate('/topic')
      }
   }

   const validateSchema = Yup.object().shape({
      lang_id: Yup.string().required('Language is required'),
      topic_name: Yup.string().required('Name is required'),
      descriptions: Yup.string().required('Descriptions is required'),
      seq_no: Yup.string().required('Please ented sequence number'),
      status: Yup.string().required('Please Select status'),
   })

   useEffect(() => {
      async function fetchData() {
         await dispatch(getLanguagesAsync())

         if (id) {
            
            await dispatch(getTopicAsync())
            await dispatch(getTopic(id))
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
                           <h6 className="heading">TOPICS</h6>

                        </CCol>
                     </CRow>

                     <CRow>

                        <CCol md={12}>
                           <CCardBody className='subCardStyle'>
                              <Formik
                                 initialValues={selected !== null ? {
                                    lang_id: selected.lang_id,
                                    topic_name: selected.topic_name,
                                    descriptions: selected.descriptions,
                                    seq_no: selected.seq_no,
                                    status: selected.status,
                                 } : initialValue}
                                 enableReinitialize={true}
                                 validationSchema={validateSchema}
                                 onSubmit={handleSubmit}
                              >
                                 {({ isSubmitting }) => (
                                    <Form>
                                       <CRow>
                                          <CCol md={6}>
                                             <CRow className='m-3'>
                                                <CCol md={6}>
                                                   <label htmlFor="lang_id">LANGUAGE</label>

                                                </CCol>
                                                <CCol md={6}>
                                                   <Field as="select" name="lang_id" id="lang_id" className="rounded rounded-3 inputTag-select">
                                                      <option value="">Select Language</option>
                                                      {languages.map((language, key) => (
                                                         <option key={key} value={language._id}>
                                                            {language.lang_name}
                                                         </option>
                                                      ))}
                                                   </Field>
                                                </CCol>
                                                <ErrorMessage name="lang_id" component="div" className="" />
                                             </CRow>

                                             <CRow className='m-3'>
                                                <CCol md={6}>
                                                   <label htmlFor="topic_name">NAME</label>


                                                </CCol>
                                                <CCol md={6}>
                                                   <Field type="text" name="topic_name" id="topic_name" className="rounded rounded-3 inputTag" />

                                                </CCol>
                                                <ErrorMessage name="topic_name" component="div" className="" />

                                             </CRow>

                                             <CRow className='m-3'>
                                                <CCol md={6}>
                                                   <label htmlFor="descriptions">DESCRIPTION</label>



                                                </CCol>
                                                <CCol md={6}>
                                                   <Field type="text" name="descriptions" id="descriptions"  className="rounded rounded-3 inputTag" />

                                                </CCol>
                                                <ErrorMessage name="descriptions" component="div" className="" />


                                             </CRow>

                                             <CRow className='m-3'>
                                                <CCol md={6}>
                                                   <label htmlFor="seq_no">SEQUENCE NO.</label>




                                                </CCol>
                                                <CCol md={6}>
                                                   <Field type="text" name="seq_no" id="seq_no" className="rounded rounded-3 inputTag" />

                                                </CCol>
                                                <ErrorMessage name="seq_no" component="div" className="" />

                                             </CRow>

                                             <CRow className='m-3'>
                                                <CCol md={6}>
                                                   <label htmlFor="status">STATUS</label>


                                                </CCol>
                                                <CCol md={6}>
                                                   <Field as="select" name="status" id="status" className="rounded rounded-3 inputTag-select">
                                                      <option value=""> Select Status</option>
                                                      <option value="active"> active</option>
                                                      <option value="inActive"> inActive</option>
                                                   </Field>

                                                </CCol>
                                                <ErrorMessage name="status" component="div" className="" />




                                             </CRow>

                                             <CRow className='m-3'>
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

export default TopicForm
