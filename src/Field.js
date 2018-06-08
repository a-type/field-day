// @flow
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import FieldGroup from './Group';
import { Consumer, type RenderArgs, type FieldInfo } from './context';
import { type FieldElementConfig, type FieldProps } from './types';

/**
 * A single Field element. **Important:** Field cannot be used on its own. Please use Field
 * within the Field.Group component.
 */
class Field extends React.Component<FieldProps> {
  static Group = FieldGroup;

  static defaultProps = {
    columnSpan: 1,
  };

  gridAreaFor = (
    element: FieldElementConfig,
    elementIndex: number,
    { column, row, columns, fieldIndex, elements }: FieldInfo,
  ): string => {
    const { columnSpan } = this.props;

    const elementRow = row * elements.length + elementIndex;

    return `${elementRow + 1} / ${column + 1} / auto / ${column +
      columnSpan +
      1}`;
  };

  callRenderElements = (fieldInfo: FieldInfo) =>
    fieldInfo.elements.map((element, index) =>
      element.render({
        gridArea: this.gridAreaFor(element, index, fieldInfo),
        config: element,
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
