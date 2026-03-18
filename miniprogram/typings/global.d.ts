// 全局对象声明
declare var Date: DateConstructor;
declare var Math: typeof Math;
declare var Boolean: BooleanConstructor;
declare var Number: NumberConstructor;
declare var String: StringConstructor;
declare var Array: ArrayConstructor;
declare var encodeURIComponent: (uri: string) => string;

// ES6数组方法类型定义
interface Array<T> {
  readonly length: number;
  find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined;
  findIndex(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): number;
  filter(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
  some(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
  forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
  includes(searchElement: T, fromIndex?: number): boolean;
  push(...items: T[]): number;
  pop(): T | undefined;
  shift(): T | undefined;
  unshift(...items: T[]): number;
  splice(start: number, deleteCount?: number, ...items: T[]): T[];
  slice(start?: number, end?: number): T[];
  concat(...items: ConcatArray<T>[]): T[];
  join(separator?: string): string;
  indexOf(searchElement: T, fromIndex?: number): number;
  lastIndexOf(searchElement: T, fromIndex?: number): number;
  every(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
  reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
  reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
  sort(compareFn?: (a: T, b: T) => number): T[];
}

// 小程序全局对象
declare const wx: any;
declare const getApp: () => any;

// 小程序Component类型定义
declare interface ComponentOptions {
  data?: any;
  methods?: any;
  properties?: any;
  observers?: any;
  lifetimes?: any;
  pageLifetimes?: any;
  behaviors?: any;
  externalClasses?: any;
  relations?: any;
  options?: any;
}

declare function Component(options: ComponentOptions): void;

// Page类型定义
declare interface PageOptions {
  data?: any;
  onLoad?: (options?: any) => void;
  onShow?: () => void;
  onReady?: () => void;
  onHide?: () => void;
  onUnload?: () => void;
  onPullDownRefresh?: () => void;
  onReachBottom?: () => void;
  onShareAppMessage?: () => any;
  onPageScroll?: (options: any) => void;
  onResize?: (options: any) => void;
  onTabItemTap?: (options: any) => void;
  methods?: any;
}

declare function Page(options: PageOptions): void;