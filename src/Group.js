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
    fieldSpacing: '10px',
    fieldElements: defaultFieldElementConfig,
  };

  render() {
    const { columns, children, fieldElements, fieldSpacing } = this.props;

    return (
      <Provider columns={columns} fieldElements={fieldElements}>
        <FieldGrid
          columns={columns}
          fieldElements={fieldElements}
          fieldSpacing={fieldSpacing}
        >
          {children}
        </FieldGrid>
      </Provider>
    );
  }
}

export default FieldGroup;
