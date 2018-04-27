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
      fieldElements={[
        {
          ...Field.Group.defaultFieldElements[0],
          height: 'auto',
          verticalAlign: 'end',
        },
        {
          ...Field.Group.defaultFieldElements[1],
          height: 'minmax(100px, auto)',
          verticalAlign: 'center',
        },
      ]}
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
  ))
  .add('different element sizes', () => (
    <Field.Group>
      <Field label="Doesn't matter the size of the element">
        <Input />
      </Field>
      <Field label="Rows stay aligned!">
        <input />
      </Field>
      <Field label="Not even extra large labels will disrupt the field alignment, even if the field they annotate is smaller than its siblings.">
        <input />
      </Field>
      <Field>
        <Input />
      </Field>
    </Field.Group>
  ))
  .add('assigning ids to labels', () => (
    <Field.Group>
      <Field label="Check the DOM to see the 'for' attr">
        <Input id="childId" />
      </Field>
      <Field label="You can pass a fieldId prop, too" fieldId="propId">
        <Input />
      </Field>
    </Field.Group>
  ))
  .add('with custom field elements', () => {
    const customFieldElements = [
      ...Field.Group.defaultFieldElements,
      // our 'helptext' custom element
      {
        height: '20px',
        verticalAlign: 'top',
        render: ({ style, fieldProps }) =>
          fieldProps.helpText && <i style={style}>{fieldProps.helpText}</i>,
      },
    ];

    return (
      <Field.Group fieldElements={customFieldElements}>
        <Field label="Label" helpText="An explanation of the field">
          <Input />
        </Field>
        <Field label="Label 2">
          <Input />
        </Field>
      </Field.Group>
    );
  });
