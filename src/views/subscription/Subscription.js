import {
   
    CButton,
    CRow,
    CTable,
    CTableBody,CTableHead,CTableRow,CCol,CCard,CCardBody,CTableDataCell,CTableHeaderCell
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import style from  '../subscription/subscription.module.css'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons';
import { deleteSubscriptionAsync, fetchedSubscriptions, getSubscriptionAsync } from './SubscriptionSlice'


const Topic = () => {
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    const subscriptions = useSelector(fetchedSubscriptions)
    console.log(subscriptions)
    const Navigate = useNavigate()

    const handleDelete = (id) => {
        dispatch(deleteSubscriptionAsync(id))
        setRefresh(true)
    }

    const handleEdit = (id) => {
        Navigate(`/subscription/form/${id}`)
        setRefresh(true)
    }

    useEffect(() => {
        console.log("aaa")
        dispatch(getSubscriptionAsync())
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
                                    <h6 className="heading">SUBSCRIPTION</h6>

                                </CCol>
                                <CCol md={3}>
                                <Link className='addButtonLink' to='/subscription/form'> 
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
                                                    <CTableHeaderCell scope="col"  className={`text-left ${style.topicLabelWidth}`}>NAME</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col"  className={`text-center ${style.topicLabelWidth}`}>DURATION</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col"  className={`text-center ${style.topicLabelWidth}`}>AMOUNT</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col"  className={`text-center ${style.topicLabelWidth}`}>START DATE</CTableHeaderCell>
                                                    <CTableHeaderCell colSpan={2} scope="col"  className={`text-center ${style.topicLabelWidth}`}>
                                                        END DATE
                                                    </CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            {/* <CTableBody className='tbody'>
                                                {subscriptions.map((subscription, key) => (
                                                    <CTableRow key={key}>
                                                        <CTableDataCell className={`text-left ${style.topicLabelWidth}`}>{subscription.name}</CTableDataCell>
                                                        <CTableDataCell  className={`text-center ${style.topicLabelWidth}`}>{subscription.duration}</CTableDataCell>
                                                        <CTableDataCell  className={`text-center ${style.topicLabelWidth}`}>{subscription.amount}</CTableDataCell>

                                                        <CTableDataCell  className={`text-center ${style.topicLabelWidth}`}>{subscription.startDate}</CTableDataCell>

                                                        <CTableDataCell  className={`text-center ${style.topicLabelWidth}`}>{subscription.EndDate}</CTableDataCell>

                                                        <CTableDataCell  className={`text-center ${style.topicLabelWidth}`}>
                                                           

                                                            <CIcon className='editIcon' icon={icon.cilPencil} onClick={() => handleEdit(subscription._id)} title='Edit'></CIcon>&nbsp;&nbsp;&nbsp;&nbsp;
                                                           
                                                            <CIcon className='deleteIcon' icon={icon.cilDelete} onClick={() => handleDelete(subscription._id)} title='Delete'></CIcon>
                                                        </CTableDataCell>
                                                        
                                                    </CTableRow>
                                                ))}
                                            </CTableBody> */}
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
