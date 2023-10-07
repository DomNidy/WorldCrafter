import rockIcon from "@/public/rock-icon.svg";
import treeIcon from "@/public/tree-icon.svg";
import paintIcon from "@/public/paint-icon.svg";
import deleteIcon from "@/public/delete-icon.svg";

export enum EditorObject {
  TREE = "tree",
  ROCK = "rock",
}

export enum EditorMode {
  PAINT = "paint",
  DELETE = "delete",
}

/**
 * Object type which describes the state of the map, where objects are placed, etc.
 */
export type EditorMapData = Record<
  string,
  { x: number; y: number; kind: EditorObject; id: string }
>;

/**
 * Stores propeties of editor objects.
 *
 * One use case of this objects properties is using widht and height to automatically calculate placement offset
 * (so that the element always appears to be placed in the center of the users cursor)
 *
 */
type EditorObjectProperties = {
  /**
   * The width of the HTML element this object represents
   */
  width: number;
  /**
   * The height of the HTML element this object represents
   */
  height: number;
  /**
   * HEX Background color for object
   */
  backgroundColor: string;
  /**
   * SVG of this objects icon
   */
  icon: any;
};

// Type used to make object types indexable
type Dictionairy = {
  [index: string]: any;
};

/**
 * Table to quickly lookup properties of an editor object
 */
export const EditorObjectMap: Record<EditorObject, EditorObjectProperties> &
  Dictionairy = {
  rock: { height: 25, width: 25, icon: rockIcon, backgroundColor: "#3f4249" },
  tree: {
    height: 60,
    width: 60,
    icon: treeIcon,
    backgroundColor: "#014c18",
  },
};

/**
 * Table to quickly look up the assosciated properties an edit mode
 */
export const EditorModeMap: Record<
  EditorMode,
  { icon: any; modeType: "destructive" | "default" }
> = {
  delete: { icon: deleteIcon, modeType: "destructive" },
  paint: { icon: paintIcon, modeType: "default" },
};
