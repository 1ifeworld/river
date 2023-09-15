/**
 * Returns typed object keys
 * @param obj
 */
export const objectKeys = <Obj>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj as object) as (keyof Obj)[];
};
