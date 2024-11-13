import { Children, ReactNode, Fragment } from "react";

//   type of utils props
interface EachUtilsProps<T> {
  of: T[];
  render: (item: T, index: number) => ReactNode;
}
//   biasa digunnakan untuk mapping data
export default function EachUtils<T>({ of, render }: EachUtilsProps<T>) {
  return <>{Children.toArray(of.map((item, index) => render(item, index)))}</>;
}
