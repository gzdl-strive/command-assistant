type DirType = Record<"title" | "path" | "desc", string>;

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