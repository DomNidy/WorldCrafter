"use client";
import { EditorMapData, EditorMode, EditorObject } from "@/definitions/Editor";
import { Dispatch, SetStateAction, createContext, useState } from "react";

/**
 *  Manages the state for the editor controls
 */
type EditorState = {
  /**
   * Describes the state of the editor map
   */
  editorMap: EditorMapData;
  /**
   * Set editor map data
   */
  setEditorMap: Dispatch<SetStateAction<EditorMapData>>;
  /**
   * Specifies the type of object the user is trying to place on the map
   */
  toolbarObjectSelected: EditorObject;
  /**
   * Updates the `toolbarObjectSelected` state
   */
  setToolbarObjectSelected: (editorObject: EditorObject) => void;
  /**
   * Specifies the mode the editor is currently in
   */
  editMode: EditorMode;
  /**
   * Updates the `toolbarObjectSelected` state
   */
  setEditMode: (editMode: EditorMode) => void;
};

export const EditorContext = createContext<EditorState>({
  toolbarObjectSelected: EditorObject.ROCK,
  editMode: EditorMode.PAINT,
  editorMap: {},
  setToolbarObjectSelected() {},
  setEditMode() {},
  setEditorMap() {},
});

export default function EditorProvider({ children }: { children: any }) {
  const [toolbarObjectSelected, setToolbarObjectSelected] =
    useState<EditorObject>(EditorObject.ROCK);

  const [editMode, setEditMode] = useState<EditorMode>(EditorMode.PAINT);

  const [editorMap, setEditorMap] = useState<EditorMapData>({});

  return (
    <EditorContext.Provider
      value={{
        editorMap: editorMap,
        setEditorMap: setEditorMap,
        toolbarObjectSelected: toolbarObjectSelected,
        setToolbarObjectSelected: setToolbarObjectSelected,
        editMode: editMode,
        setEditMode: setEditMode,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
