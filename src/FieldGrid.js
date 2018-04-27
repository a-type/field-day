// @flow
import React, { type Node } from 'react';

export type Props = {
  children: Node,
  columns: number,
  fieldElementVerticalSpacing: string,
  fieldHorizontalSpacing: string,
  fieldElementHeights: Array<string>,
};

const FieldRow = ({
  children,
  columns = 2,
  fieldElementVerticalSpacing = '5px',
  fieldHorizontalSpacing = '10px',
  fieldElementHeights = ['auto', 'auto'],
}: Props) => (
  <div
    style={{
      display: 'grid',
      // each element has its own row in the grid, with its own height
      gridAutoRows: fieldElementHeights.join(' '),
      // each column has an equal size. To make fields larger than
      // adjacent fields, use the columnSpan prop on Field to span
      // multiple columns. This keeps all field sizes directly proportional
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      // defines spacing between rows and columns
      gridGap: `${fieldElementVerticalSpacing} ${fieldHorizontalSpacing}`,
    }}
  >
    {children}
  </div>
);

export default FieldRow;
