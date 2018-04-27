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
      element.render({
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
