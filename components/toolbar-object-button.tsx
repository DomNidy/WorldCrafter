"use client";
import { EditorContext } from "@/context/editor-context";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { EditorObjectMap, EditorObject } from "@/definitions/Editor";
import ToolbarButton from "./toolbar-button";

export default function ToolbarObjectButton({
  editorObject,
}: {
  editorObject: EditorObject;
}) {
  const editor = useContext(EditorContext);
  const isSelected = editor.toolbarObjectSelected === editorObject;

  return (
    <ToolbarButton
      variant="default"
      onClickCallback={() => editor.setToolbarObjectSelected(editorObject)}
      isSelected={isSelected}
    >
      <Image src={EditorObjectMap[editorObject].icon} alt="" />
    </ToolbarButton>
  );
}
