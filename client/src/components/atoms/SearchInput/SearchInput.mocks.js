import React from 'react';
import { action } from '@storybook/addon-actions';
import SearchInput from './SearchInput';

const Template = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {
};

export const WithPredefinedText = Template.bind({});
WithPredefinedText.args = {
    initialSearchTerm: "Example Search"
};

export const WithCustomSearchAction = Template.bind({});
WithCustomSearchAction.args = {
    onSearch: action('search')
};