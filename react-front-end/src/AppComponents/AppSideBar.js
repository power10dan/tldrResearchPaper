import {slide as Menu} from 'react-burger-menu'
import React, { Component } from 'react'
import styles from './AppComponentStyles/AppSideNav.css'
import SideBarMenu from './AppSideBar.js'
import { Button, Card, Row, Col } from 'react-materialize';
import NestedList from './ListItems.js'


// Dummy component, should only be getting data from
// components from the AppBusinessLogic folder. 
export default class SideNavCustom extends Component{
	showSettings(event){
		event.preventDefault();
	}
	render(){
		// we pass the data into our components
		return(
			<div>
				<Menu styles= {styles}  isOpen={true} noOverlay width={'180px'}>
					<img src="https://png.icons8.com/user/androidL/96" className="user" title="User" width="96" height="96" />
					 <a id="userEmail" className="menu-item" href="/">Welcome Stranger!</a>
					 <NestedList />
				</Menu>
			 </div>
		);
	}

}
