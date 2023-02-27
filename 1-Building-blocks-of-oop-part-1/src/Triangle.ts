import { Point } from "./Point";
import { Shape } from "./Shape";

enum TriangleTypes {
  ThreeSidesAreEqual = 'equilateral triangle',
  TwoSidesAreEqual = 'isosceles triangle',
  SidesAreDifferent = 'scalene triangle',
  Invalid = 'invalid triangle'
}

export class Triangle extends Shape {
  constructor(pointA: Point, pointB: Point, pointC: Point);
  constructor(pointA: Point, pointB: Point, pointC: Point, color: string, filled: boolean);

  constructor(pointA: Point, pointB: Point, pointC: Point, color?: string, filled?: boolean) {
    const points = [pointA, pointB, pointC];
    if(color && filled) {
      super(points, color, filled);
    } else {
      super(points);
    }
  };

  public toString(): string {
    const pointsToString = this.points.map((point, index) => `v${index+1}=${point.toString()}`);
    return `Triangle[${pointsToString}]`
  }

  public getType(): TriangleTypes {
    let result :TriangleTypes;
    const points = this.points;
    const pointA = points[0];
    const pointB = points[1];
    const pointC = points[2];

    const sideAB = pointA.distance(pointB);
    const sideAC = pointA.distance(pointC);
    const sideBC = pointB.distance(pointC);

    const sortedSides = [sideAB, sideAC, sideBC].sort((a, b) => a-b);
    const [firstSide, secondSide, thirdSide] = sortedSides;

    const tolerance = .001;

    if(firstSide + secondSide <= thirdSide) {
      result = TriangleTypes.Invalid;
    } else if(Math.abs(thirdSide - firstSide) < tolerance) {
      result = TriangleTypes.ThreeSidesAreEqual;
    } else if(firstSide < secondSide && secondSide < thirdSide) {
      result = TriangleTypes.SidesAreDifferent;
    } else {
      result = TriangleTypes.TwoSidesAreEqual;
    }

    return result;
  }
}
