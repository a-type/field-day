// @flow
import React, { type Node, type ComponentType } from 'react';
import FieldGrid from './FieldGrid';
import { Provider } from './context';
import { defaultFieldElementConfig } from './constants';
import { type FieldElementConfig } from './types';

type Props = {
  columns: number,
  children: Node,
  rowSpacing: string,
  fieldElementVerticalSpacing: string,
  fieldHorizontalSpacing: string,
  fieldElements: Array<FieldElementConfig>,
};

class Fields extends React.PureComponent<Props> {
  static defaultProps = {
    columns: 2,
    rowSpacing: '20px',
    fieldElementVerticalSpacing: '5px',
    fieldHorizontalSpacing: '10px',
    fieldElements: defaultFieldElementConfig,
  };

  render() {
    const {
      rowSpacing,
      columns,
      children,
      fieldElements,
      fieldHorizontalSpacing,
      fieldElementVerticalSpacing,
    } = this.props;

    const childCount = React.Children.count(children);

    return (
      <Provider columns={columns} fieldElements={fieldElements}>
        <FieldGrid
          columns={columns}
          rows={childCount}
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

export default Fields;
