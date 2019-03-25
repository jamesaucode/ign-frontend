import Enzyme, {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import React, {Component} from 'react';
import Post from '../components/Post.js';
import sinon from 'sinon';

describe('<Post />', () => {
  it('Mounts normally', () => {
    const wrapper = shallow(<Post />);
    expect(wrapper.find('div.post')).to.have.lengthOf(1);
  });
    it('Sets count correctly', () => {
        const wrapper = mount(<Post />);
        wrapper.setState({ count : 10 });
        expect(wrapper.state().count).to.equal(10);
    })
    it('Receives props correctly', () => {
        const wrapper = mount(<Post thumbnail={"thumbnail"} headline={"headline"} title={"title"} publishDate={"Date"} duration={123} />)
        expect(wrapper.props().thumbnail).to.equal('thumbnail');
        expect(wrapper.props().headline).to.equal('headline');
        expect(wrapper.props().publishDate).to.equal('Date');
        expect(wrapper.props().duration).to.equal(123);
        expect(wrapper.props().title).to.equal('title');
    })
});
// const {thumbnail, headline, title, publishDate, duration} = this.props;
Enzyme.configure({adapter: new Adapter()});
