import React from 'react';
import PropTypes from 'prop-types';
import FieldRowContainer from './styles/FieldRowContainer';
import FieldRow from './styles/FieldRow';

class Fields extends React.PureComponent {
  static defaultProps = {
    RowContainer: FieldRowContainer,
    Row: FieldRow,
    columns: 2,
    rowSpacing: '20px',
    fieldElementVerticalSpacing: '5px',
    fieldHorizontalSpacing: '10px',
    fieldContentMinHeight: '0',
  };

  partitionFields = () => {
    const {
      columns,
      children,
      Row,
      fieldElementVerticalSpacing,
      fieldHorizontalSpacing,
      fieldContentMinHeight,
    } = this.props;
    const childArray = React.Children.toArray(children);

    const rows = childArray.reduce(
      (rows, child) => {
        const childColumnSpan = child.props.columnSpan || 1;

        if (childColumnSpan > columns) {
          throw new Error(
            `A Field has a columnSpan of ${childColumnSpan}, but the containing Fields only has ${columns} columns`,
          );
        }

        const currentRow = rows[rows.length - 1];
        if (currentRow.columnWidth + childColumnSpan <= columns) {
          // add to current row
          return [
            ...rows.slice(0, rows.length - 1),
            {
              children: [
                ...currentRow.children,
                {
                  column: currentRow.columnWidth,
                  element: child,
                },
              ],
              columnWidth: currentRow.columnWidth + childColumnSpan,
            },
          ];
        } else {
          // create new row
          return [
            ...rows,
            {
              children: [{ column: 0, element: child }],
              columnWidth: childColumnSpan,
            },
          ];
        }
      },
      [{ children: [], columnWidth: 0 }],
    );

    return rows.map((row, rowIdx) => (
      <Row
        key={rowIdx}
        columns={columns}
        fieldContentMinHeight={fieldContentMinHeight}
        fieldElementVerticalSpacing={fieldElementVerticalSpacing}
        fieldHorizontalSpacing={fieldHorizontalSpacing}
      >
        {row.children.map(({ element, column }) =>
          React.cloneElement(element, { column }),
        )}
      </Row>
    ));
  };

  render() {
    const { RowContainer, rowSpacing } = this.props;

    return (
      <RowContainer rowSpacing={rowSpacing}>
        {this.partitionFields()}
      </RowContainer>
    );
  }
}

export default Fields;
