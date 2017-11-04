import React from 'react';
import ReactDOM from 'react-dom';
import SideNavCustom from '../../AppComponents/AppSideBar.js';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureStore from 'redux-mock-store'

