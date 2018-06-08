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

export type FieldElementConfig = {
  height: CSSValue,
  verticalAlign: 'end' | 'start' | 'stretch' | 'center',
  render: RenderElementFunction,
};

export type FieldGroupProps = {
  columns: number,
  children: ChildrenArray<Element<typeof Field>>,
  fieldSpacing: CSSValue,
  fieldElements: Array<FieldElementConfig>,
};
