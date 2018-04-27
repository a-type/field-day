// @flow
import React, { createContext, PureComponent, type Node } from 'react';
import { type FieldElementConfig } from './constants';

const FieldGroupContext = createContext();

export type Props = {
  columns: number,
  children: Node,
  fieldElements: Array<FieldElementConfig>,
};

export type FieldInfoArgs = {
  columnSpan: number,
};

export type FieldInfo = {
  column: number,
  row: number,
  columns: number,
  fieldIndex: number,
  elements: Array<FieldElementConfig>,
};

export type RenderArgs = {
  getFieldInfo(args: FieldInfoArgs): FieldInfo,
};

export class Provider extends PureComponent<Props> {
  /**
   * Stealing this approach from Downshift...
   * auto-incrementing columns
   */
  currentColumn: number = 0;
  currentRow: number = 0;
  currentItem: number = 0;

  resetColumns = () => {
    this.currentColumn = 0;
    this.currentRow = 0;
    this.currentItem = 0;
  };

  getFieldInfo = ({ columnSpan = 1 }: FieldInfoArgs): FieldInfo => {
    const { columns } = this.props;

    if (columnSpan > columns) {
      throw new Error(
        `A Field has a columnSpan of ${columnSpan}, but the containing Group only has ${columns} columns.`,
      );
    }

    // wrap if columnspan overlaps column width
    if (this.currentColumn + columnSpan > columns) {
      this.currentRow = this.currentRow + 1;
      this.currentColumn = 0;
    }

    const column = this.currentColumn;
    this.currentColumn = this.currentColumn + columnSpan;
    this.currentItem = this.currentItem + 1;

    return {
      column,
      row: this.currentRow,
      columns,
      fieldIndex: this.currentItem,
      elements: this.props.fieldElements,
    };
  };

  value = { getFieldInfo: this.getFieldInfo };

  render() {
    // re-rendering fields every time, so we clear them out
    // again to recompute columns, etc.
    this.resetColumns();

    const { children } = this.props;

    return (
      <FieldGroupContext.Provider value={this.value}>
        {children}
      </FieldGroupContext.Provider>
    );
  }
}

export const Consumer = FieldGroupContext.Consumer;
