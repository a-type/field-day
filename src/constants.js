import React from 'react';
import { type RenderElementFunction } from './types';

const getHtmlFor = (children): ?string => {
  if (children.props && children.props.id) {
    return ((children.props.id: any): string);
  }
};
const defaultRenderLabel: RenderElementFunction = ({
  gridArea,
  fieldProps,
  config,
}) =>
  fieldProps.label && (
    // extend label style with extra bottom margin
    <label
      style={{
        gridArea,
        justifySelf:
          fieldProps.labelHorizontalAlign || config.horizontalAlign || 'start',
        alignSelf:
          fieldProps.labelVerticalAlign || config.verticalAlign || 'end',
        marginBottom: fieldProps.spaceAfterLabel || config.spaceAfter || '5px',
      }}
      htmlFor={fieldProps.fieldId || getHtmlFor(fieldProps.children)}
    >
      {fieldProps.label}
    </label>
  );

const defaultRenderContent: RenderElementFunction = ({
  fieldProps,
  gridArea,
  config,
}) =>
  fieldProps.children && (
    <div
      style={{
        gridArea,
        justifySelf:
          fieldProps.horizontalAlign || config.horizontalAlign || 'stretch',
        alignSelf: fieldProps.verticalAlign || config.verticalAlign || 'start',
        marginBottom:
          fieldProps.spaceAfterContent || config.spaceAfter || '10px',
      }}
    >
      {fieldProps.children}
    </div>
  );

const fieldDefaultRenderElements = [defaultRenderLabel, defaultRenderContent];

export const defaultFieldElementConfig = [
  {
    height: 'auto',
    verticalAlign: 'end',
    horizontalAlign: 'start',
    spaceAfter: '5px',
    render: defaultRenderLabel,
  },
  {
    height: 'auto',
    verticalAlign: 'center',
    horizontalAlign: 'stretch',
    spaceAfter: '10px',
    render: defaultRenderContent,
  },
];
