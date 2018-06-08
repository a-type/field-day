// @flow
import React, { type Node } from 'react';
import { type FieldElementConfig, type CSSValue } from './types';

export type Props = {
  children: Node,
  columns: number,
  fieldSpacing: CSSValue,
  fieldElements: Array<FieldElementConfig>,
  style: {},
  id: string,
  className: string,
};

const FieldRow = ({
  children,
  columns = 2,
  fieldSpacing = '10px',
  fieldElements,
  style = {},
  id,
  className,
}: Props) => (
  <div
    style={{
      ...style,
      display: 'grid',
      // each element has its own row in the grid, with its own height
      gridAutoRows: fieldElements.map(el => el.height).join(' '),
      // each column has an equal size. To make fields larger than
      // adjacent fields, use the columnSpan prop on Field to span
      // multiple columns. This keeps all field sizes directly proportional
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      // defines spacing between rows and columns
      gridGap: `0 ${fieldSpacing}`,
    }}
    id={id}
    className={className}
  >
    {children}
  </div>
);

export default FieldRow;
