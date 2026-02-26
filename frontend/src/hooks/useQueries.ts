import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Shape } from '../backend';

// Calculate perimeter from wheel circumference and rotation count
export function useCalculatePerimeter() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      wheelCircumference,
      rotationCount,
    }: {
      wheelCircumference: number;
      rotationCount: number;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.calculatePerimeter(wheelCircumference, rotationCount);
    },
  });
}

// Calculate rectangle area from length and width
export function useCalculateRectangleArea() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      length,
      width,
    }: {
      length: number;
      width: number;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.calculateRectangleArea(length, width);
    },
  });
}

// Calculate square area from side length
export function useCalculateSquareArea() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ side }: { side: number }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.calculateSquareArea(side);
    },
  });
}

// Calculate irregular area from triangle base+height pairs
export function useCalculateIrregularArea() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      triangles,
    }: {
      triangles: Array<[number, number]>;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.calculateIrregularArea(triangles);
    },
  });
}

// Calculate area from wheel rotations given a shape type
export function useCalculateAreaFromRotations() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      wheelCircumference,
      rotationCount,
      shape,
      width,
    }: {
      wheelCircumference: number;
      rotationCount: number;
      shape: 'square' | 'rectangle';
      width?: number;
    }) => {
      if (!actor) throw new Error('Actor not initialized');

      const shapeVariant: Shape =
        shape === 'square'
          ? { __kind__: 'square', square: null }
          : { __kind__: 'rectangle', rectangle: { width: width ?? 0 } };

      return actor.areaFromRotations(wheelCircumference, rotationCount, shapeVariant);
    },
  });
}
