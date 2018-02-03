import React from 'react';
import ErrSnack from '../../AppComponents/ErrDialog.js';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import TestUtils from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

describe('Error Dialog: ', () => {

    it('renders the create new profile component without crashing', () => {
        const output = shallow(<ErrSnack />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });

});