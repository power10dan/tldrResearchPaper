import React from 'react';
import ReactDOM from 'react-dom';
import SideNavCustom from '../../AppComponents/AppSideBar.js';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureStore from 'redux-mock-store'

configure({ adapter: new Adapter() });

const mockStore = configureStore();

describe('Side Navigator', () => {
    it('renders the app side bar with crashing', () => {
      const wrapper = shallow(<SideNavCustom/>, { context: { store: mockStore() } });
      /* expect(wrapper.contains(<div title="User" />)).toBe(true);*/
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});
