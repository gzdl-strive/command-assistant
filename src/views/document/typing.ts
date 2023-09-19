type DirType = Record<"title" | "name" | "desc", string>;

type DirectType = {
  title: string;
  folder: string;
  children: DirType[];
}[];

type LocationState = Record<'describe' | 'defaultDir', string>;

export type {
  DirType,
  DirectType,
  LocationState
};