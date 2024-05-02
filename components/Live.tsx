import React, { useCallback, useState } from 'react';
import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursors from "./cursor/LiveCursors";
import CursorChat from "./cursor/CursorChat";
import { CursorMode, CursorState, ReactionEvent } from "@/types/type";
import { useEffect } from 'react';
import ReactionSelector from './reactions/ReactionButton';
import FlyingReaction from './reactions/FlyingReaction';
import useInterval from '@/hooks/useInterval';

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}

function Live({ canvasRef }: Props) {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const [cursorState, setCursorState] = useState<CursorState>({ mode: CursorMode.Hidden });
  const [reactions, setReactions] = useState<any[]>([]);

  const broadcast = useBroadcastEvent();

  const handlePointerMove = useCallback((event) => {
    event.preventDefault();
    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
      updateMyPresence({ cursor: { x, y } });
    }
  }, [cursor, cursorState.mode, updateMyPresence]);

  const handlePointerUp = useCallback(() => {
    setCursorState((state) => ({
      ...state,
      isPressed: state.mode === CursorMode.Reaction ? true : state.isPressed
    }));
  }, []);

  const handlePointerLeave = useCallback((event) => {
    event.preventDefault();
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, [updateMyPresence]);

  const handlePointerDown = useCallback((event) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
    setCursorState((state) => ({
      ...state,
      isPressed: state.mode === CursorMode.ReactionSelector ? true : state.isPressed
    }));
  }, [updateMyPresence]);

  const setReaction = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

  useInterval(() => {
    if (cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
      const newReaction = {
        point: { x: cursor.x, y: cursor.y },
        value: cursorState.reaction,
        timestamp: Date.now(),
      };
      setReactions((prevReactions) => [...prevReactions, newReaction]);
      broadcast(newReaction); // Broadcasting reaction object directly
    }
  }, 100);

  useEffect(() => {
    const filteredReactions = reactions.filter((reaction) => {
      return reaction.timestamp > Date.now() - 4000;
    });
    setReactions(filteredReactions);
  }, [reactions]);

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent;
    const newReaction = {
      point: { x: event.x, y: event.y },
      value: event.value,
      timestamp: Date.now(),
    };
    setReactions((prevReactions) => [...prevReactions, newReaction]);
  });

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === '/') {
        setCursorState({
          mode: CursorMode.Chat,
          message: '',
          previousMessage: null,
        });
      } else if (e.key === 'Escape') {
        updateMyPresence({ message: '' });
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === 'e') {
        setCursorState({ mode: CursorMode.ReactionSelector });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [updateMyPresence]);

  return (
    <div
      id='canvas'
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="w-full flex justify-center items-center text-center"
    >
      <canvas ref={canvasRef} />

      {reactions.map((reaction, index) => (
        <FlyingReaction
          key={index} // Use index as key since timestamp might not be unique
          x={reaction.point.x}
          y={reaction.point.y}
          timestamp={reaction.timestamp}
          value={reaction.value}
        />
      ))}

      {cursor && <CursorChat cursor={cursor} cursorState={cursorState} setCursorState={setCursorState} updateMyPresence={updateMyPresence} />}
      <LiveCursors others={others} />

      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector setReaction={setReaction} />
      )}
    </div>
  );
}

export default Live;