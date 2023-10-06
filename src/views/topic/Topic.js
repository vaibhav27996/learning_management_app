import {
    CContainer,
    CButton,
    CRow,
    CTable,
    CTableBody,CTableHead,CTableRow,CCol,CCard,CCardBody,CTableDataCell,CTableHeaderCell
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTopicAsync, fetchedTopics, getTopicAsync } from './TopicSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import style from  '../topic/topic.module.css'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons';

// import styles from './language.module.css'

const Topic = () => {
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    const topics = useSelector(fetchedTopics)
    console.log(topics)
    const Navigate = useNavigate()

    const handleDelete = (id) => {
        dispatch(deleteTopicAsync(id))
        setRefresh(true)
    }

    const handleEdit = (id) => {
        Navigate(`/topic/form/${id}`)
        setRefresh(true)
    }

    useEffect(() => {
        console.log("aaa")
        dispatch(getTopicAsync())
        console.log("bbb")

        setRefresh(false)

    }, [dispatch, refresh])

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
                                <CCol md={3}>
                                <Link className='addButtonLink' to='/topic/form'> 
                                    <CButton className='addButton ms-3 mt-3'>
                                        <span className='plusAddForm'>+</span>
                                         &nbsp;&nbsp; <span className='addFormLabel'>ADD</span>
                                    </CButton></Link>
                                </CCol>
                            </CRow>
                          
                            <CRow>

                                <CCol md={12}>
                                    <CCardBody className='subCardStyle'>
                                        {/* <CRow>
                                            <CCol>
                                            <Field
                                                className="rounded rounded-3 input"
                                                type="text"
                                                placeholder="SEARCH"
                                                name="search"
                                                autoComplete="off"
                                            />
                                            </CCol>
                                        </CRow> */}
                                        <CTable className='tableList' >
                                            <CTableHead className='thead'>
                                                <CTableRow>
                                                    {/* <CTableHeaderCell className='text-center' scope="col">Sr.No</CTableHeaderCell> */}
                                                    <CTableHeaderCell scope="col"  className={`text-left ${style.topicLabelWidth}`}>LANGUAGE</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col"  className={`text-center ${style.topicLabelWidth}`}>NAME</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col"  className={`text-center ${style.topicLabelWidth}`}>DESCRIPTION</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col"  className={`text-center ${style.topicLabelWidth}`}>S.N</CTableHeaderCell>
                                                    <CTableHeaderCell colSpan={2} scope="col"  className={`text-center ${style.topicLabelWidth}`}>
                                                        ACTION
                                                    </CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody className='tbody'>
                                                {topics.map((topic, key) => (
                                                    <CTableRow key={key}>
                                                        {/* <CTableHeaderCell scope="row">{key + 1}</CTableHeaderCell> */}
                                                        <CTableDataCell className={`text-left ${style.topicLabelWidth}`}>{topic.languageData[0].lang_name}</CTableDataCell>
                                                        <CTableDataCell  className={`text-center ${style.topicLabelWidth}`}>{topic.name}</CTableDataCell>
                                                        <CTableDataCell  className={`text-center ${style.topicLabelWidth}`}>{topic.descriptions}</CTableDataCell>

                                                        <CTableDataCell  className={`text-center ${style.topicLabelWidth}`}>{topic.seq_no}</CTableDataCell>

                                                        <CTableDataCell  className={`text-center ${style.topicLabelWidth}`}>
                                                           

                                                            <CIcon className='editIcon' icon={icon.cilPencil} onClick={() => handleEdit(topic._id)} title='Edit'></CIcon>&nbsp;&nbsp;&nbsp;&nbsp;
                                                           
                                                            <CIcon className='deleteIcon' icon={icon.cilDelete} onClick={() => handleDelete(topic._id)} title='Delete'></CIcon>
                                                        </CTableDataCell>
                                                        
                                                    </CTableRow>
                                                ))}
                                            </CTableBody>
                                        </CTable>
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

export default Topic
