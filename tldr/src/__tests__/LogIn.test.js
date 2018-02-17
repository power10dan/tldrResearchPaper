import React from 'react'
import App from '../App.js';
import LogIn  from '../AppComponent/LogIn.js';
import {mount, shallow,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });


describe("LogIn",()=> {
  it('renders without crashing', () => {
      const component = shallow(<LogIn />);
      expect(component).toHaveLength(1);
});
});


// describe("LogIn",()=> {
//   it('renders without crashing', () => {
//       const component = mount(<LogIn />);
//       expect(component).toHaveLength(1);
// });
// });
