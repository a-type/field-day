import React from 'react';

const copyArea = (input, times) =>
  new Array(times)
    .fill(input)
    .map((text, index) => `${text}${index}`)
    .join(' ');

const FieldRow = ({
  children,
  columns,
  fieldElementVerticalSpacing = '5px',
  fieldHorizontalSpacing = '10px',
  fieldContentMinHeight = '0px',
}) => (
  <div
    style={{
      display: 'grid',
      // each row has 3 sub-rows: label, content, helpText.
      // there's a named area for each column.
      gridTemplateAreas: [
        `"${copyArea('content', columns)}"`,
        `"${copyArea('label', columns)}"`,
      ].join('\n'),
      // defines spacing between rows and columns
      gridGap: `${fieldElementVerticalSpacing} ${fieldHorizontalSpacing}`,
      // each column has an equal size. To make fields larger than
      // adjacent fields, use the columnSpan prop on Field to span
      // multiple columns. This keeps all field sizes directly proportional
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      // label expands as needed
      // content row has a minimum size, and can expand as needed.
      gridTemplateRows: `minmax(${fieldContentMinHeight}, auto) auto`,
    }}
  >
    {children}
  </div>
);

FieldRow.defaultProps = {
  columnCount: 2,
};

export default FieldRow;
