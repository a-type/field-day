// @flow
import React, { type Node, type ComponentType } from 'react';
import FieldGrid from './FieldGrid';
import { Provider } from './context';

type Props = {
  columns: number,
  children: Node,
  rowSpacing: string,
  fieldElementVerticalSpacing: string,
  fieldHorizontalSpacing: string,
  fieldElementOrder: Array<string>,
  fieldElementHeights: Array<string>,
};

class Fields extends React.PureComponent<Props> {
  static defaultProps = {
    columns: 2,
    rowSpacing: '20px',
    fieldElementVerticalSpacing: '5px',
    fieldHorizontalSpacing: '10px',
    fieldElementOrder: ['label', 'content'],
    fieldElementHeights: ['auto', 'auto'],
  };

  render() {
    const {
      rowSpacing,
      columns,
      children,
      fieldElementHeights,
      fieldElementOrder,
      fieldHorizontalSpacing,
      fieldElementVerticalSpacing,
    } = this.props;

    const childCount = React.Children.count(children);

    return (
      <Provider columns={columns} elementOrder={fieldElementOrder}>
        <FieldGrid
          columns={columns}
          rows={childCount}
          fieldElementHeights={fieldElementHeights}
          fieldElementVerticalSpacing={fieldElementVerticalSpacing}
          fieldHorizontalSpacing={fieldHorizontalSpacing}
          fieldElementOrder={fieldElementOrder}
        >
          {children}
        </FieldGrid>
      </Provider>
    );
  }
}

export default Fields;
