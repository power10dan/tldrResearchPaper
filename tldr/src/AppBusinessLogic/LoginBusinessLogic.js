import React, { Component } from 'react';
import { AppStateActionCreator } from '../Redux/Actions/ActionCreators.js';
import { CURR_PAGE } from '../Redux/Actions/ActionConstants.js';
import { connect } from 'react-redux';
import LogInPanel from '../AppComponent/LogIn.js';

class LogInControl extends React.Component {
    constructor(props){
        super(props);
        this.state={
          disabled: true,
          Token:"",
          buttonText: "Get A Token",
        }
    }

    onChangeFunc = (event)=>{
    	this.setState({Token: event.target.value});
    	this.setState({buttonText: "Login"})
    }
  
    successful_login = (event) => {
      if (this.state.disabled==true){
          event.preventDefault();
          window.open("https://prometheus.eecs.oregonstate.edu/token/generate?asid=321398945712335&then=","_blank")
          this.setState( {disabled: !this.state.disabled} )
      }else if (
          this.state.Token.length==12){
          let payload=1;
          this.props.updatePage(payload)
      }
    }

    render(){
    	return(
    		<LogInPanel
    			buttonIcon={this.state.buttonText}
    			successfulLoginFunc={this.successful_login}
    			onChangeClick={this.onChangeFunc}
    			TokenField={this.state.Token}
    			disable={this.state.disabled}
    		/>
    	)
    }

}

const mapDispatchToProps = (dispatch)=>{
	return ({
		updatePage: (payLoad)=>{dispatch(AppStateActionCreator(CURR_PAGE, payLoad));},
	});
}

export default connect(null, mapDispatchToProps)(LogInControl);
