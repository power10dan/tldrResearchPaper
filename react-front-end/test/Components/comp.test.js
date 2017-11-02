import React from 'react';
import ReactDOM from 'react-dom';
import SideNavCustom from '../../src/AppComponents/AppSideBar.js';

describe('Side Navigator', () => {
    it('renders the app side bar with crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SideNavCustom/>, div);
    });
});
