// if this grows large I think we should start grouping shapes in their own files
// that have a theme. Something like UserShapes / TableShapes / ErrorShapes / etc...

export type TableData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  classes: number;
  active: boolean;
}[];
