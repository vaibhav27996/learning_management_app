import {
    CContainer,
    CButton,
    CRow,
    CTable,
    CCol,
    CCard, CCardBody,
    CForm, CFormLabel, CFormInput,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CTableHead,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import {
    createLanguageAsync,
    deleteLanguageAsync,
    editLanguageAsync,
    fetchedLanguages,
    getLanguagesAsync,
} from './LanguageSlice'
// import styles from './language.module.css'

const Language = () => {
    const [intitialValues, setInitialValues] = useState({ name: '' })
    const [refresh, setRefresh] = useState(true)
    const [editLanguageId, setEditLanguageId] = useState(null)
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const languages = useSelector(fetchedLanguages)

    const handleDelete = (id) => {
        dispatch(deleteLanguageAsync(id))
        setRefresh(true)
    }

    const handleSubmit = (values, { setSubmitting }) => {
        try {
        
            if (isEditing) {
                dispatch(editLanguageAsync({ values, id: editLanguageId }))
            } else {
                dispatch(createLanguageAsync(values))
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
            setInitialValues({ name: '' })
            setRefresh(true)
            setIsEditing(false) // Reset t
            setEditLanguageId(null)
        }
    }

    const handleEdit = (language) => {
        setEditLanguageId(language._id)
        setIsEditing(true)
        setInitialValues({ name: language.lang_name })
    }

    useEffect(() => {
        dispatch(getLanguagesAsync())
        setRefresh(false)
    }, [refresh, dispatch])

    return (


        <>
            <CRow>
                <CCol xs>
                    <CCard className="mb-4 cardStyle">
                        <CCardBody>
                            <CRow>
                                <CCol md={12}>
                                    <h5 className="heading">LANGUAGE</h5>

                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol md={12}>
                                    <CCardBody className='subCardStyle'>
                                        <Formik
                                            initialValues={intitialValues}
                                            enableReinitialize={true}
                                            validate={(values) => {
                                                const errors = {}
                                                if (!values.name) {
                                                    errors.name = 'Name is required'
                                                }

                                                return errors
                                            }}
                                            onSubmit={handleSubmit} >
                                            {({ isSubmitting }) => (

                                                <Form className="row g-3">
                                                    <CRow className="pt-4 ">
                                                        <CCol className="LanguageForm">
                                                            <label htmlFor="name" className="ps-4 pe-5">
                                                                LANGUAGE
                                                            </label>
                                                            <Field
                                                                className="rounded rounded-3 inputTag"
                                                                type="text"
                                                                placeholder="ENTER LANGUAGE"
                                                                name="name"
                                                                autoComplete="off"
                                                            />

                                                            <span className="ps-1">
                                                                {isEditing ? (
                                                                    <CButton  type="submit" disabled={isSubmitting}>
                                                                        EDIT
                                                                    </CButton>
                                                                ) : (
                                                                    <CButton  type="submit" disabled={isSubmitting}>
                                                                        ADD
                                                                    </CButton>
                                                                )}
                                                            </span>
                                                            <ErrorMessage name="name" className="" />
                                                        </CCol>
                                                    </CRow>

                                                </Form>
                                            )}
                                        </Formik><br />
                                        <div>
                                            {languages && languages.map((language, index) =>
                                            (
                                                <div className='langTableList' key={index}>
                                                    <CRow >
                                                        <CCol md={8}>
                                                            <span >{language.lang_name}</span>
                                                        </CCol>
                                                        <CCol md={2}><button className='btn btn-sm btn-info' onClick={() => handleEdit(language)}>Edit</button></CCol>
                                                        <CCol md={2}><button className='btn btn-sm btn-danger' onClick={() => handleDelete(language._id)}>Delete</button></CCol>
                                                    </CRow>
                                                </div>

                                            )

                                            )}

                                        </div>
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

export default Language
