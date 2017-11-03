import React from 'react';
import CreateNewProfileComp from '../../AppComponents/CreateProfile';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import TestUtils from 'react-dom/test-utils';


configure({ adapter: new Adapter() });

const mockStore = configureStore();

describe('Create New Profile: ', () => {

    // render test
    it('renders the create new profile component without crashing', () => {

        // This is what we expect the component to be, shallow just renders the
        // component without doing a deep render of its children
        const output = mount(<CreateNewProfileComp />);

        // this is the actual test, we render it and output that to JSON so we
        // can inspect it, this is held in the snapshots folder
        expect(shallowToJson(output)).toMatchSnapshot();
    });


    // state tests
    // it('should handle state changes', () => {
        // const component = mount(<CreateNewProfileComp />);

        // let b1 = document.getElementsbyTagName("Button");
        // TestUtils.Simulate.click(b1);
        // expect(clickSpy.called).to.be.ok;
        // expect(component.state.open).toEqual(false);
        // component.find('DialogActions').simulate('click');
        // expect(component.state.open).toEqual(true);
    // });

});

