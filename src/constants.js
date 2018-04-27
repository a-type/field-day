import React from 'react';
import { type RenderElementFunction } from './types';

const getHtmlFor = (children): ?string => {
  if (children.props && children.props.id) {
    return ((children.props.id: any): string);
  }
};
const defaultRenderLabel: RenderElementFunction = ({ style, fieldProps }) =>
  fieldProps.label && (
    <label
      style={style}
      htmlFor={fieldProps.fieldId || getHtmlFor(fieldProps.children)}
    >
      {fieldProps.label}
    </label>
  );

const defaultRenderContent: RenderElementFunction = ({ fieldProps, style }) =>
  fieldProps.children && (
    <div style={{ ...style, justifySelf: fieldProps.align || 'stretch' }}>
      {fieldProps.children}
    </div>
  );

const fieldDefaultRenderElements = [defaultRenderLabel, defaultRenderContent];

export const defaultFieldElementConfig = [
  {
    height: 'auto',
    verticalAlign: 'end',
    render: defaultRenderLabel,
  },
  {
    height: 'auto',
    verticalAlign: 'center',
    render: defaultRenderContent,
  },
];
