import React from 'react';
import SearchInput from './SearchInput';

export default {
    title: 'Components/atoms/SearchInput',
    tags: ['autodocs'], 
    component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  
};

const Template = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = SearchInput.default;

export const InsideInput = {
    args: {
    },
  };
  
  export const SubmitInput = {
    args: {
    },
  };
