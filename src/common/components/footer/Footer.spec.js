import React from 'react';
import Footer from './Footer';
import renderer from 'react-test-renderer';


test('It should render Footer component correctly', () => {
  const component = renderer.create(
    <Footer />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
});