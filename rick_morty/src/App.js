import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import RickPic from './Assets/RickPic.png';
import Morty from './Assets/morty.png';

class App extends Component {
    constructor(props){
      super(props);
      this.state={
         pageState: 0,
         my_rick: "",
         my_morty: "",
      }

       this.getRickData()
       this.getMortyData()
    }

    getHeader = ()=>{
        let options = {
            method: 'GET',
            mode: 'cors',
        };

        return options;
    }

    getRickData = ()=>{
       let fetch_url = "https://radiant-wildwood-67970.herokuapp.com/rick/";
       let headerOptions = this.getHeader()
       fetch(fetch_url,
             headerOptions)
       .then(result=>{
              console.log(result)
              return result.json()
       }).then(data=>{
              this.setState({my_rick:data})
       }).catch(err=>{
          console.log(err)
       })
    }

    getMortyData = ()=>{
      let fetch_url = "https://radiant-wildwood-67970.herokuapp.com/morty/";
       let headerOptions = this.getHeader()
       fetch(fetch_url,
             headerOptions)
       .then(result=>{
            return result.json()
       }).then(data=>{
            console.log(data)
            this.setState({my_morty:data})
       }).catch(err=>{
          console.log(err)
       })

    }

    setPage = ()=>{
        this.setState({pageState: 1})
    }

    render() {
      let pageState = null;
      if(this.state.pageState === 1){
          pageState =
          <Fragment>
             <img
                   src={RickPic}
                   alt="rick_pic"
                   height="250"
                   width="250"
                   vspace="150"
                   hspace="150"
              />
              <img
                   src={Morty}
                   alt="rick_pic"
                   height="250"
                   width="150"
                   vspace="150"
                   hspace="150"
              />
              <p align="center">
                Rick:
                { " " + this.state.my_rick}
              </p>
              <button onClick={this.getRickData}>
                  Activate Rick
              </button>

               <p align="center">
                Morty:
                { " " + this.state.my_morty}
              </p>
             <button onClick={this.getMortyData}>
                  Activate Morty
            </button>
        </Fragment>

      } else {
          pageState =<Fragment>
                    <h2>Rick and Morty Text Generator</h2>
                      <button><a
                          target="_blank"
                          vspace="150"
                          href="https://prometheus.eecs.oregonstate.edu/token/generate?asid=321398945712335&then="
                          onClick={this.setPage}
                          class="button" >
                          Get Token
                      </a></button>
                    <h4>Once you are logged in, return to this page.</h4>
                    </Fragment>
      }

      return (
        <div className="App">
            {pageState}
        </div>
      );
    }
}

export default App;
