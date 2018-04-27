// @flow
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import FieldGroup from './Group';
import { Consumer, type RenderArgs, type FieldProps } from './context';

export type RenderLabelFunctionArgs = {
  children: Node,
  htmlFor: ?string,
  style: {},
};
export type RenderLabelFunction = (args: RenderLabelFunctionArgs) => Node;

export type RenderContentFunctionArgs = {
  children: Node,
  style: {},
  fieldProps: Props,
};
export type RenderContentFunction = (args: RenderContentFunctionArgs) => Node;

export type UserSuppliedProps = {};
export type Props = UserSuppliedProps & {
  children: Node,
  columnSpan: number,
  renderLabel: RenderLabelFunction,
  renderContent: RenderContentFunction,
  label: Node,
  htmlFor: string,
  contentSpacing: string,
  alignContent: 'left' | 'right' | 'center' | 'stretch',
};

const defaultRenderLabel: RenderLabelFunction = ({
  children,
  htmlFor,
  style,
}) => (
  <label style={style} htmlFor={htmlFor}>
    {children}
  </label>
);

const defaultRenderContent: RenderContentFunction = ({ children, style }) => (
  <div style={style}>{children}</div>
);

/**
 * A single Field element. **Important:** Field cannot be used on its own. Please use Field
 * within the Field.Group component.
 */
class Field extends React.Component<Props> {
  static Group = FieldGroup;

  static defaultProps = {
    columnSpan: 1,
    renderLabel: defaultRenderLabel,
    renderContent: defaultRenderContent,
    contentSpacing: '5px',
    alignContent: 'stretch',
    label: null,
  };

  stylesFor = (
    elementName: string,
    { column, row, columns, fieldIndex, elementOrder }: FieldProps,
  ): {} => {
    const { columnSpan } = this.props;

    const elementRow =
      row * elementOrder.length + elementOrder.indexOf(elementName);

    const styles = {
      gridArea: `${elementRow + 1} / ${column + 1} / auto / ${column +
        columnSpan +
        1}`,
      // align-self determines how the parts vertically align if an adjacent part is taller.
      // labels should stick to the bottom if an adjacent label has two or more lines.
      // content and helpText should stick to the top if an adjacent element is taller than them.
      // TODO: make user-controlled?
      alignSelf: elementName === 'label' ? 'end' : 'start',
    };

    return styles;
  };

  getHtmlFor = (): ?string => {
    const { children, htmlFor } = this.props;

    if (htmlFor) {
      return htmlFor;
    }

    if (children.props && children.props.id) {
      return ((children.props.id: any): string);
    }
  };

  renderLabel = (fieldProps: FieldProps) => {
    const { label, renderLabel, children } = this.props;

    if (!label) {
      return null;
    }

    const htmlFor = this.getHtmlFor();

    return renderLabel({
      htmlFor,
      children: label,
      style: this.stylesFor('label', fieldProps),
    });
  };

  renderField = ({ getFieldProps }: RenderArgs) => {
    const fieldProps = getFieldProps({ columnSpan: this.props.columnSpan });

    return (
      <React.Fragment>
        {this.renderLabel(fieldProps)}
        {this.props.renderContent({
          style: this.stylesFor('content', fieldProps),
          children: this.props.children,
          fieldProps: this.props,
        })}
      </React.Fragment>
    );
  };

  render() {
    return <Consumer>{this.renderField}</Consumer>;
  }
}

export default Field;
