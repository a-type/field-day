import { type ChildrenArray, type Element } from 'react';
import Field from './Field';

export type CSSValue = string;

export type UserSuppliedProps = any;
export type FieldProps = UserSuppliedProps & {
  children: Node,
  columnSpan: number,
  renderElements: Array<RenderElementFunction>,
};

export type RenderElementFunctionArgs = {
  gridArea: string,
  config: FieldElementConfig,
  fieldProps: Props,
};
export type RenderElementFunction = (args: RenderElementFunctionArgs) => Node;

export type Alignment = 'end' | 'start' | 'stretch' | 'center';
export type FieldElementConfig = {
  height: CSSValue,
  render: RenderElementFunction,
  verticalAlign?: Alignment,
  horizontalAlign?: Alignment,
} & {};

export type FieldGroupProps = {
  columns: number,
  children: ChildrenArray<Element<typeof Field>>,
  fieldSpacing: CSSValue,
  fieldElements: Array<FieldElementConfig>,
  style: {},
  className: string,
  id: string,
};
