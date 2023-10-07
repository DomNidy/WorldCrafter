"use client";
import { useEffect, useRef, useState, useContext } from "react";
import { EditorContext } from "@/context/editor-context";
import {
  EditorObjectMap,
  EditorObject,
  EditorMode,
  EditorMapData,
} from "@/definitions/Editor";
import Image from "next/image";

export default function Canvas() {
  const editor = useContext(EditorContext);

  // This watches for changes in canvas size
  const [resizeObserver, setResizeObserver] = useState<ResizeObserver>();

  // The current dimmensions of the canvas
  const [dimmensions, setDimmensions] = useState<{
    width: number;
    height: number;
  }>();

  // TODO: Convert objectLocations to be a hasmap where key is a random uuid so we can lookup an object by its id
  // Stores the locations of where objects have been placed on the map
  const [objectLocations, setObjectLocations] = useState<EditorMapData>({});

  // Reference so we have access to the dom element of the canvas
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Create ResizeObserver to listen for changes in canvas size
      const observer = new ResizeObserver((resizedArray) => {
        // Whenever the canvas size changes, update the dimmension state
        // Since ResizeObserver can subscribe to multiple events, it returns an array of events
        // of all elements that changed, because of this we'll find the element in that array
        // which has an id of canvas (as this cooresponds to our canvas element)
        const canvasResizeEvent = resizedArray.find(
          (e) => e.target.id === "canvas"
        );

        // Update state of canvas dimmensions
        setDimmensions({
          width: canvasResizeEvent?.contentRect.width || 0,
          height: canvasResizeEvent?.contentRect.height || 0,
        });
      });

      // Set element to observe canvas
      observer.observe(canvasRef.current);
      setResizeObserver(observer);
    }
  }, []);

  // Add mouse listener for canvas
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {}

    // Handles painting of objects while in paint mode
    function handlePaintObject(e: MouseEvent) {
      if (editor.editMode === EditorMode.PAINT) {
        console.log("Paint handler ran");
        setObjectLocations((past) => {
          // Generate a random id for this object
          const objectID = Math.random().toString().replace("0.", "");

          if (past) {
            return {
              ...past,
              [objectID]: {
                kind: editor.toolbarObjectSelected,
                x:
                  e.clientX -
                  EditorObjectMap[editor.toolbarObjectSelected].width,
                y:
                  e.clientY -
                  EditorObjectMap[editor.toolbarObjectSelected].height,
                id: objectID,
              },
            };
          }
          return {
            [objectID]: {
              kind: editor.toolbarObjectSelected,
              x:
                e.clientX - EditorObjectMap[editor.toolbarObjectSelected].width,
              y:
                e.clientY -
                EditorObjectMap[editor.toolbarObjectSelected].height,
              id: objectID,
            },
          };
        });
      }
    }

    // Handles deleting of objects while in delete mode
    function handleDeleteObject(e: MouseEvent) {
      const clickedObjectID = (e.target as Element).id;
      if (editor.editMode === EditorMode.DELETE) {
        console.log("Delete handler ran");
        setObjectLocations((past) => {
          if (past) {
            return {
              ...Object.fromEntries(
                Object.entries(past).filter(
                  (obj) => obj[1].id !== clickedObjectID
                )
              ),
            };
          }
          return {};
        });

        editor.setEditorMap((past) => {
          if (past) {
            return {
              ...Object.fromEntries(
                Object.entries(past).filter(
                  (obj) => obj[1].id !== clickedObjectID
                )
              ),
            };
          }
          return {};
        });
      }
    }

    // Add listeners
    canvasRef.current?.addEventListener("mousemove", handleMouseMove);
    canvasRef.current?.addEventListener("mousedown", handlePaintObject);
    canvasRef.current?.addEventListener("mousedown", handleDeleteObject);
    // Cleanup listeners
    return () => {
      canvasRef.current?.removeEventListener("mousemove", handleMouseMove);
      canvasRef.current?.removeEventListener("mousedown", handlePaintObject);
      canvasRef.current?.removeEventListener("mousedown", handleDeleteObject);
    };
  });

  useEffect(() => {
    console.log("Ran");
    editor.setEditorMap({ ...objectLocations, ...editor.editorMap });
  }, [objectLocations]);

  return (
    <div
      ref={canvasRef}
      id="canvas"
      className="absolute bg-gray-500  w-full h-full "
    >
      {Object.values(editor.editorMap).map((objectPlacement, idx) => (
        <div
          className={`rounded-full  hover:saturate-150 hover:scale-125  cursor-pointer
           flex justify-center items-center  absolute  
          `}
          id={`${objectPlacement.id}`}
          style={{
            backgroundColor:
              EditorObjectMap[objectPlacement.kind].backgroundColor,
            width: EditorObjectMap[objectPlacement.kind].width,
            height: EditorObjectMap[objectPlacement.kind].height,
            top: objectPlacement.y,
            left: objectPlacement.x,
          }}
          key={idx}
        >
          <Image
            src={EditorObjectMap[objectPlacement.kind].icon}
            id={`${objectPlacement.id}`}
            alt=""
          />
        </div>
      ))}

      <div className="fixed bottom-2 left-2 text-xl rounded-md bg-gray-900 p-2 bg-opacity-60">
        {dimmensions?.width || 0} x {dimmensions?.height || 0}
      </div>
    </div>
  );
}
