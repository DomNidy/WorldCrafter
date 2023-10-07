"use client";
import { EditorMapData } from "@/definitions/Editor";

export function exportMap(map: EditorMapData) {
  const mapJson = JSON.stringify(map);

  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:application/json;charset=utf-8" + encodeURIComponent(mapJson)
  );
  element.setAttribute("download", "mapfile");
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();

}
