"use client";

import { useRef, useEffect, useState } from "react";
import Live from "../components/Live";
import NavBar from "../components/NavBar.tsx";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import { initializeFabric, handleCanvasMouseDown, handleResize, handleCanvasMouseUp, renderCanvas,handleCanvasObjectModified, handleCanvaseMouseMove, handleCanvasSelectionCreated} from "@/lib/canvas";
import { fabric } from "fabric";
import { ActiveElement } from "@/types/type";
import { useMutation, useRedo, useStorage, useUndo } from "@/liveblocks.config";
import {defaultNavElement} from "@/constants"
import { handleDelete } from "@/lib/key-events";
import { handleKeyDown } from "@/lib/key-events";
import { handleImageUpload } from "@/lib/shapes";
export default function Page() {
  const undo = useUndo();
  const redo = useRedo();
  const imageInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);
  const activeObjectRef = useRef<string | null>(null);
  const canvasObjects = useStorage((root) => root.canvasObjects);
  const isEditingRef = useRef(false);
  const [elementAttributes, setElementAttributes] = useState({
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "#aabbcc",
    stroke: "#aabbcc",
  });
  const syncShapeInStorage = useMutation(({storage}, object) => {
        if (!object) return;

        const {objectId} = object;
        const shapeData = object.toJSON();
        shapeData.objectId = objectId;

        const canvasObjects = storage.get('canvasObjects');
        canvasObjects.set(objectId, shapeData)
  }, [])
  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon: "",
  });

  const deleteShapeFromStorage = useMutation(({ storage }, objectId) => {
    const canvasObjects = storage.get("canvasObjects");
    
    canvasObjects.delete(objectId)
},[]);



  const deleteAllShapes = useMutation(({storage}) => {
    const canvasObjects = storage.get("canvasObjects");

    if (!canvasObjects || canvasObjects.size === 0) return true;

    for(let [key,value] of canvasObjects.entries()) {
      canvasObjects.delete(key)
    }

    return canvasObjects.size === 0;
  },[])

  // Function to handle selecting an active element
  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem);
    selectedShapeRef.current = elem?.value as string; // Set selectShape to the chosen shape

    switch (elem?.value) {
      case "reset":
        deleteAllShapes();
        fabricRef.current.clear;
        setActiveElement(defaultNavElement)
        break;
        case 'delete':
          handleDelete(fabricRef.current as any, deleteShapeFromStorage)
          setActiveElement(defaultNavElement)
          break;
        case 'image': 
          imageInputRef.current?.click();
          isDrawing.current = "false";
          if (fabricRef.current) {
            fabricRef.current.isDrawing = 'false';
          }
          break;
      default:
        break;
    }
  };

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef });

    if (canvas) {
      canvas.on("mouse:down", (options: fabric.IEvent) => {
        handleCanvasMouseDown({
          options,
          canvas,
          isDrawing,
          shapeRef,
          selectedShapeRef,
        });
      });
    }

    if (canvas) {
      canvas.on("mouse:move", (options: fabric.IEvent) => {
        handleCanvaseMouseMove({
          options,
          canvas,
          isDrawing,
          shapeRef,
          selectedShapeRef,
          syncShapeInStorage
        });
      });
    }

    if (canvas) {
      canvas.on("selection:created", (options: fabric.IEvent) => {
        handleCanvasSelectionCreated({
          options,
          isEditingRef,
          setElementAttributes,
        });
      });
    }

    if (canvas) {
      canvas.on("mouse:up", (options: fabric.IEvent) => {
        handleCanvasMouseUp({
          canvas,
          isDrawing,
          shapeRef,
          selectedShapeRef,
          syncShapeInStorage,
          setActiveElement,
          activeObjectRef,
        });
      });
    }

    if (canvas) {
      canvas.on("object:modified", (options: fabric.IEvent) => {
        handleCanvasObjectModified({
          options,
          syncShapeInStorage,
        });
      });
    }

    window.addEventListener("resize", () => {
      handleResize({ fabricRef });
    });

    
    window.removeEventListener("resize", () => {
        handleResize({ fabricRef });
        canvas.dispose();
      });

    window.addEventListener("keydown", (e: any) => {
      handleKeyDown({
        e,
        canvas: fabricRef.current,
        undo,
        redo,
        syncShapeInStorage,
      })
    })
    
      return () => {
        canvas.dispose()
      }
  }, [fabricRef]);


  
  useEffect(() => {
    renderCanvas({
      fabricRef,
      canvasObjects,
      activeObjectRef,

    })
  }, [canvasObjects])

  return (
    <main className="h-screen overflow-hidden">
      <NavBar activeElement={activeElement} handleActiveElement={handleActiveElement} imageInputRef={imageInputRef} handleImageUpload={(e: any) => {e.stopPropagation(); handleImageUpload({
        file: e.target.files[0],
        canvas: fabricRef as any,
        shapeRef,
        syncShapeInStorage
      })}}/>
      <section className="flex h-full flex-row">
        <LeftSideBar allShapes={Array.from(canvasObjects)}/>
        <Live canvasRef={canvasRef} />
        <RightSideBar 
        elementAttributes={elementAttributes}
        setElementAttributes={setElementAttributes}
        fabricRef={fabricRef}
        isEditingRef={isEditingRef}
        activeObjectRef={activeObjectRef}
        syncShapeInStorage={syncShapeInStorage}
        />
      </section>
    </main>
  );
}
