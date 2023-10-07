"use client";
import { EditorContext } from "@/context/editor-context";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { EditorMode, EditorModeMap } from "@/definitions/Editor";
import ToolbarButton from "./toolbar-button";

export default function ToolbarEditModeButton({
  editMode,
}: {
  editMode: EditorMode;
}) {
  const editor = useContext(EditorContext);
  const isSelected = editor.editMode === editMode;

  return (
    <ToolbarButton
      variant={EditorModeMap[editMode].modeType}
      onClickCallback={() => editor.setEditMode(editMode)}
      isSelected={isSelected}
    >
      <Image src={EditorModeMap[editMode].icon} alt="" />
    </ToolbarButton>
  );
}
