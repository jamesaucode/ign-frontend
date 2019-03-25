import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow,mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../components/Button.js';
import sinon from 'sinon';
Enzyme.configure({ adapter: new Adapter() });
describe('<Button />', () => {
    it('Mount normally', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper.find('div')).to.have.lengthOf(1);
    })
    it('Receives text props', () => {
        const wrapper = mount(<Button text={"Test"} />);
        expect(wrapper.props().text).to.equal('Test');
        wrapper.setProps({ text : 'Changed' })
        expect(wrapper.props().text).to.equal('Changed');
    })
    it('onClick funtion works', () => {
        const onClick = sinon.spy();
        const wrapper = mount(<Button onClick={onClick}/>);
        wrapper.find('div').simulate('click');
        expect(onClick).to.have.property('callCount', 1);
    })
    it('Receives icon prop properly', () => {
        const wrapper = mount(<Button icon={"random class"} />);
        expect(wrapper.props().icon).to.equal("random class");
    })
    it('Changes class when active is changed', () => {
        const wrapper = mount(<Button active={false} />);
        expect(wrapper.find('div.active')).to.have.lengthOf(0);
        wrapper.setProps({ active : true })
        expect(wrapper.find('div.active')).to.have.lengthOf(1);
    })
})
