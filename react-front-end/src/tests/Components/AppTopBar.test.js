import React from 'react';
import AppTopBar from '../../AppComponents/AppTopBar';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure} from 'enzyme';
import configureStore from 'redux-mock-store';


configure({ adapter: new Adapter() });

const mockStore = configureStore();

describe('Top Bar', () => {
    it('renders the top bar without crashing', () => {
        const wrapper = shallow(<AppTopBar/>, { context: { store: mockStore() } });
    });
});
