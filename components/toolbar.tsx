"use client";
import ToolbarEditModeButton from "./toolbar-editmode-button";
import ToolbarObjectButton from "./toolbar-object-button";
import { EditorMapData, EditorMode, EditorObject } from "@/definitions/Editor";
import { EditorContext } from "@/context/editor-context";
import { useContext, useState } from "react";
import { Syntax } from "postcss";
1;

export default function Toolbar() {
  const editor = useContext(EditorContext);
  return (
    <div className="fixed flex w-[80px]  items-center h-fit flex-col top-2 left-2 text-xl rounded-md bg-gray-900 p-2 bg-opacity-60 z-20 gap-8">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-gray-100 text-base tracking-tight font-medium border-b-[1px] rounded-sm border-gray-200 border-opacity-50">
          Objects
        </h2>
        <ToolbarObjectButton editorObject={EditorObject.ROCK} />
        <ToolbarObjectButton editorObject={EditorObject.TREE} />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-gray-100 text-base tracking-tight font-medium border-b-[1px] rounded-sm border-gray-200 border-opacity-50">
          Mode
        </h2>
        <ToolbarEditModeButton editMode={EditorMode.PAINT} />
        <ToolbarEditModeButton editMode={EditorMode.DELETE} />
      </div>

      <button
        className="w-fit rounded-lg p-2 bg-gray-800 hover:bg-gray-700 text-sm tracking-tighter active:border-gray-300 active:scale-90"
        onClick={() => {
          let newMapData = prompt("Please enter map json", "Map here");
          let newMapDataJSON;
          try {
            newMapDataJSON = JSON.parse(newMapData || "{}");
          } catch {
            alert("Imported map data was invalid :(");
            return;
          }
          
          editor.setEditorMap(JSON.parse(newMapData || "{}"));
        }}
      >
        Import
      </button>
      <button
        className="w-fit rounded-lg p-2 bg-gray-800 hover:bg-gray-700 text-sm tracking-tighter active:border-gray-300 active:scale-90"
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(editor.editorMap));
          alert("Copied map to clipboard!");
        }}
      >
        Export
      </button>
    </div>
  );
}
