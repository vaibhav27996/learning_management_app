import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { setSidebarShow, setUnfoldable } from 'src/store/slice'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.slice.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.slice.sidebarShow)

  return (
    <CSidebar
      style={{backgroundColor:"#4B7283"}}
      className=''
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setSidebarShow(visible))
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" style={{background: 'rgb(75, 114, 131)'}}  to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
