type DirType = Record<"title" | "path", string>;

type DirectType = {
  title: string;
  children: DirType[];
}[];

type LocationState = Record<'describe' | 'defaultDir', string>;

export type {
  DirType,
  DirectType,
  LocationState
};