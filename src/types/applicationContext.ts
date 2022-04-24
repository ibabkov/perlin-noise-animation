// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IApplicationState {}

export type TApplicationStateModifier = (
  state: IApplicationState
) => Partial<IApplicationState>;

export type TApplicationSetState = (
  modifier: TApplicationStateModifier
) => void;

export type TApplicationContext = [IApplicationState, TApplicationSetState];
