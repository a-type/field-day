// @flow
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import FieldGroup from './Group';
import { Consumer, type RenderArgs, type FieldInfo } from './context';
import { type FieldElementConfig } from './types';

export type RenderElementFunctionArgs = {
  style: {},
  fieldProps: Props,
};
export type RenderElementFunction = (args: RenderElementFunctionArgs) => Node;

export type UserSuppliedProps = any;
export type Props = UserSuppliedProps & {
  children: Node,
  columnSpan: number,
  renderElements: Array<RenderElementFunction>,
};

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
  fieldProps.children && <div style={style}>{fieldProps.children}</div>;

const fieldDefaultRenderElements = [defaultRenderLabel, defaultRenderContent];

/**
 * A single Field element. **Important:** Field cannot be used on its own. Please use Field
 * within the Field.Group component.
 */
class Field extends React.Component<Props> {
  static Group = FieldGroup;
  static defaultRenderElements = fieldDefaultRenderElements;

  static defaultProps = {
    columnSpan: 1,
    renderElements: fieldDefaultRenderElements,
  };

  stylesFor = (
    element: FieldElementConfig,
    elementIndex: number,
    { column, row, columns, fieldIndex, elements }: FieldInfo,
  ): {} => {
    const { columnSpan } = this.props;

    const elementRow = row * elements.length + elementIndex;

    const styles = {
      gridArea: `${elementRow + 1} / ${column + 1} / auto / ${column +
        columnSpan +
        1}`,
      // align-self determines how the parts vertically align if an adjacent part is taller.
      // labels should stick to the bottom if an adjacent label has two or more lines.
      // content and helpText should stick to the top if an adjacent element is taller than them.
      // TODO: make user-controlled?
      alignSelf: element.verticalAlign,
    };

    return styles;
  };

  callRenderElements = (fieldInfo: FieldInfo) =>
    fieldInfo.elements.map((element, index) =>
      this.props.renderElements[index]({
        style: this.stylesFor(element, index, fieldInfo),
        fieldProps: this.props,
      }),
    );

  renderField = ({ getFieldInfo }: RenderArgs) => {
    const fieldInfo = getFieldInfo({ columnSpan: this.props.columnSpan });

    return (
      <React.Fragment>{this.callRenderElements(fieldInfo)}</React.Fragment>
    );
  };

  render() {
    return <Consumer>{this.renderField}</Consumer>;
  }
}

export default Field;
