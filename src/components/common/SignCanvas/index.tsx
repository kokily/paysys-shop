'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSetAtom } from 'jotai';
import styles from './styles.module.scss';
import { setImage } from '@/helpers/client/atom';

type Coordinate = {
  x: number;
  y: number;
};

interface Props {
  width: number;
  height: number;
}

export function SignCanvas({ width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setCurrentImage = useSetAtom(setImage);
  const [mousePos, setMousePos] = useState<Coordinate | undefined>(undefined);
  const [isPainting, setIsPainting] = useState(false);

  const getCoordinates = (e: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;

    return {
      x: e.pageX - canvas.offsetLeft,
      y: e.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate,
  ) => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      context.strokeStyle = 'black';
      context.lineJoin = 'round';
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();
      context.stroke();
    }
  };

  const startPaint = useCallback((e: MouseEvent) => {
    const coordinates = getCoordinates(e);

    if (coordinates) {
      setIsPainting(true);
      setMousePos(coordinates);
    }
  }, []);

  const paint = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isPainting) {
        const newMousePosition = getCoordinates(e);
        if (mousePos && newMousePosition) {
          drawLine(mousePos, newMousePosition);
          setMousePos(newMousePosition);
        }
      }
    },
    [isPainting, mousePos],
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  const startTouch = useCallback((e: TouchEvent) => {
    e.preventDefault();

    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    let touch = e.touches[0];
    let mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });

    canvas.dispatchEvent(mouseEvent);
  }, []);

  const touch = useCallback((e: TouchEvent) => {
    e.preventDefault();

    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;

    let touch = e.touches[0];
    let mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });

    canvas.dispatchEvent(mouseEvent);
  }, []);

  const exitTouch = useCallback((e: TouchEvent) => {
    e.preventDefault();

    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;

    let mouseEvent = new MouseEvent('mouseup', {});

    canvas.dispatchEvent(mouseEvent);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    canvas.addEventListener('touchstart', startTouch);
    canvas.addEventListener('touchmove', touch);
    canvas.addEventListener('touchend', exitTouch);
    setCurrentImage(canvas.toDataURL('image/png'));

    return () => {
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', paint);
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
      canvas.removeEventListener('touchstart', startTouch);
      canvas.removeEventListener('touchmove', touch);
      canvas.removeEventListener('touchend', exitTouch);
      setCurrentImage('');
    };
  }, [startPaint, paint, exitPaint, exitTouch, startTouch, touch, setCurrentImage]);

  return (
    <canvas
      className={styles.canvas}
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
}
