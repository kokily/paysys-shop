"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./sign-canvas.css";

type Coordinate = { x: number; y: number };

type Props = {
  width?: number;
  height?: number;
  /** 그려진 PNG dataURL 지우면 "" */
  onChange: (image: string) => void;
};

/** 마우스/터치 서명 캔버스 */
export default function SignCanvas({
  width = 320,
  height = 240,
  onChange,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef<Coordinate | undefined>(undefined);
  const isPaintingRef = useRef(false);
  const hasDrawingRef = useRef(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  const onChangeRef = useRef(onChange);

  onChangeRef.current = onChange;

  const getCoordinates = (clientX: number, clientY: number): Coordinate => {
    const canvas = canvasRef.current;

    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const drawLine = (start: Coordinate, end: Coordinate) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  };

  const emitImage = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    if (!hasDrawingRef.current) {
      onChangeRef.current("");
      return;
    }
    onChangeRef.current(canvas.toDataURL("image/png"));
  }, []);

  const fillWhite = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const clearCanvas = () => {
    fillWhite();
    hasDrawingRef.current = false;
    setHasDrawing(false);
    onChangeRef.current("");
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    fillWhite();

    onChangeRef.current("");

    const startPaint = (e: MouseEvent) => {
      isPaintingRef.current = true;
      mousePosRef.current = getCoordinates(e.clientX, e.clientY);
    };

    const paint = (e: MouseEvent) => {
      if (!isPaintingRef.current || !mousePosRef.current) return;

      const current = getCoordinates(e.clientX, e.clientY);

      drawLine(mousePosRef.current, current);

      mousePosRef.current = current;
      hasDrawingRef.current = true;

      setHasDrawing(true);
    };

    const exitPaint = () => {
      if (!isPaintingRef.current) return;

      isPaintingRef.current = false;
      mousePosRef.current = undefined;
      emitImage();
    };

    const startTouch = (e: TouchEvent) => {
      e.preventDefault();

      const touch = e.touches[0];

      if (!touch) return;

      isPaintingRef.current = true;
      mousePosRef.current = getCoordinates(touch.clientX, touch.clientY);
    };

    const touchMove = (e: TouchEvent) => {
      e.preventDefault();

      if (!isPaintingRef.current || !mousePosRef.current) return;

      const touch = e.touches[0];

      if (!touch) return;

      const current = getCoordinates(touch.clientX, touch.clientY);

      drawLine(mousePosRef.current, current);
      mousePosRef.current = current;
      hasDrawingRef.current = true;
      setHasDrawing(true);
    };

    const exitTouch = () => {
      if (!isPaintingRef.current) return;

      isPaintingRef.current = false;
      mousePosRef.current = undefined;
      emitImage();
    };

    canvas.addEventListener("mousedown", startPaint);
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    canvas.addEventListener("touchstart", startTouch, { passive: false });
    canvas.addEventListener("touchmove", touchMove, { passive: false });
    canvas.addEventListener("touchend", exitTouch);

    return () => {
      canvas.removeEventListener("mousedown", startPaint);
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
      canvas.removeEventListener("touchstart", startTouch);
      canvas.removeEventListener("touchmove", touchMove);
      canvas.removeEventListener("touchend", exitTouch);
    };
  }, [emitImage, width, height]);

  return (
    <div className="sign-canvas-container">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="sign-canvas"
      />
      <button
        type="button"
        className="sign-clear-btn"
        onClick={clearCanvas}
        disabled={!hasDrawing}
      >
        지우기
      </button>
    </div>
  );
}
