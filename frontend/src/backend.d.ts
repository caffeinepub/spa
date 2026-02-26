import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Shape = {
    __kind__: "rectangle";
    rectangle: RectangleDimensions;
} | {
    __kind__: "square";
    square: null;
};
export interface RectangleDimensions {
    width: number;
}
export interface backendInterface {
    areaFromRotations(wheelCircumference: number, rotationCount: number, shape: Shape): Promise<number>;
    calculateIrregularArea(triangleDimensions: Array<[number, number]>): Promise<number>;
    calculatePerimeter(wheelCircumference: number, rotationCount: number): Promise<number>;
    calculateRectangleArea(length: number, width: number): Promise<number>;
    calculateSquareArea(side: number): Promise<number>;
}
