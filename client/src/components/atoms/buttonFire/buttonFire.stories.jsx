import React from 'react';
import Button from './buttonFire';
import { primaryButtonProps, secondaryButtonProps, dangerButtonProps } from './buttonFire.mocks';

export default {
    title: 'Atoms/ButtonFire',
    component: Button,
    argTypes: {
      backgroundColor: { control: 'color' },
      color: { control: 'color' },
    },
  };
  
  const Template = (args) => <Button {...args} />;
  
  export const Primary = Template.bind({});
  Primary.args = {
    children: 'Primary',
    variant: 'primary',
  };
  
  export const Secondary = Template.bind({});
  Secondary.args = {
    children: 'Secondary',
    variant: 'secondary',
  };
  
  export const Danger = Template.bind({});
  Danger.args = {
    children: 'Danger',
    variant: 'danger',
  };