import React from 'react';

import { storiesOf } from '@storybook/react';

import Field from '../src';

import Input from './Input';

storiesOf('Field', module)
  .add('simple layout', () => (
    <Field.Group>
      <Field>
        <Input />
      </Field>
      <Field>
        <Input />
      </Field>
      <Field>
        <Input />
      </Field>
      <Field>
        <Input />
      </Field>
    </Field.Group>
  ))
  .add('with labels', () => (
    <Field.Group>
      <Field label="Hello">
        <Input />
      </Field>
      <Field label="World">
        <Input />
      </Field>
    </Field.Group>
  ))
  .add('with column spans', () => (
    <Field.Group columns={4}>
      <Field label="medium" columnSpan={2}>
        <Input />
      </Field>
      <Field label="small">
        <Input />
      </Field>
      <Field label="small">
        <Input />
      </Field>
      <Field label="wide" columnSpan={3}>
        <Input />
      </Field>
      <Field label="medium" columnSpan={2}>
        <Input />
      </Field>
      <Field label="small">
        <Input />
      </Field>
    </Field.Group>
  ))
  .add('demonstrating label collapse', () => (
    <Field.Group>
      <Field>
        <Input value="No label" />
      </Field>
      <Field>
        <Input value="No label" />
      </Field>
      <Field label="has label">
        <Input />
      </Field>
      <Field>
        <Input value="No label" />
      </Field>
      <Field>
        <Input value="No label" />
      </Field>
      <Field>
        <Input value="No label" />
      </Field>
      <Field>
        <Input value="No label" />
      </Field>
      <Field>
        <Input value="No label" />
      </Field>
    </Field.Group>
  ))
  .add('customized spacing', () => (
    <Field.Group
      fieldElementVerticalSpacing="8px"
      fieldHorizontalSpacing="20px"
      fieldElementHeights={['auto', 'minmax(60px, auto)']}
    >
      <Field label="much roomier">
        <Input />
      </Field>
      <Field>
        <Input />
      </Field>
      <Field columnSpan={2} label="such space">
        <Input />
      </Field>
    </Field.Group>
  ))
  .add('with a large label', () => (
    <Field.Group>
      <Field label="This label is quite large. It will eventually wrap. If it's not wrapping on your screen, you probably have a pretty big screen. Try making the window smaller.">
        <Input />
      </Field>
      <Field label="This label is smaller.">
        <Input />
      </Field>
      <Field label="This label is smaller.">
        <Input />
      </Field>
      <Field label="This label is quite large. It will eventually wrap. If it's not wrapping on your screen, you probably have a pretty big screen. Try making the window smaller.">
        <Input />
      </Field>
    </Field.Group>
  ));
