// @flow
import React from 'react';
import FieldGrid from './FieldGrid';
import { Provider } from './context';
import { defaultFieldElementConfig } from './constants';
import { type FieldElementConfig, type FieldGroupProps } from './types';

class FieldGroup extends React.PureComponent<FieldGroupProps> {
  static defaultFieldElements = defaultFieldElementConfig;

  static defaultProps = {
    columns: 2,
    fieldElementVerticalSpacing: '5px',
    fieldHorizontalSpacing: '10px',
    fieldElements: defaultFieldElementConfig,
  };

  render() {
    const {
      columns,
      children,
      fieldElements,
      fieldHorizontalSpacing,
      fieldElementVerticalSpacing,
    } = this.props;

    return (
      <Provider columns={columns} fieldElements={fieldElements}>
        <FieldGrid
          columns={columns}
          fieldElements={fieldElements}
          fieldElementVerticalSpacing={fieldElementVerticalSpacing}
          fieldHorizontalSpacing={fieldHorizontalSpacing}
        >
          {children}
        </FieldGrid>
      </Provider>
    );
  }
}

export default FieldGroup;
