import React from 'react';
import PropTypes from 'prop-types';
import DefaultLabel from './styles/Label';
import FieldContent from './styles/FieldContent';
import { get } from 'lodash';
import FieldGroup from './Group';

const defaultRenderLabel = ({ children, htmlFor, style }) => (
  <label style={style} htmlFor={htmlFor}>
    {children}
  </label>
);

const defaultRenderContent = ({ children, fieldProps, style }) => (
  <FieldContent
    style={style}
    align={fieldProps.align}
    fieldContentSpacing={fieldProps.contentSpacing || '5px'}
  >
    {children}
  </FieldContent>
);

/**
 * A single Field element. **Important:** Field cannot be used on its own. Please use Field
 * within the Field.Group component.
 */
class Field extends React.Component {
  static Group = FieldGroup;

  static defaultProps = {
    column: 0,
    columnSpan: 1,
    renderLabel: defaultRenderLabel,
    renderContent: defaultRenderContent,
    label: null,
  };

  stylesFor = gridName => {
    const { column, columnSpan } = this.props;

    const endColumn = column + columnSpan - 1;
    return {
      gridArea: `${gridName}${column} / ${gridName}${column} / ${gridName}${endColumn} / ${gridName}${endColumn}`,
      // align-self determines how the parts vertically align if an adjacent part is taller.
      // labels should stick to the bottom if an adjacent label has two or more lines.
      // content and helpText should stick to the top if an adjacent element is taller than them.
      alignSelf: gridName === 'label' ? 'end' : 'start',
    };
  };

  renderLabel = () => {
    const { label, renderLabel, children } = this.props;

    if (!label) {
      return null;
    }

    const htmlFor =
      (children || null) && (children.props || null) && children.props.id;

    return renderLabel({
      htmlFor,
      children: label,
      style: this.stylesFor('label'),
    });
  };

  render() {
    const { children, renderContent, alignContent } = this.props;

    return (
      <React.Fragment>
        {renderContent({
          style: this.stylesFor('content'),
          children,
          align: alignContent,
        })}
        {this.renderLabel()}
      </React.Fragment>
    );
  }
}

export default Field;
