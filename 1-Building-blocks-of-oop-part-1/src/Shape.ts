import { Point } from "./Point";

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  protected points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);

  constructor(points: Point[], color: string = 'green', filled: boolean = true) {
    if(points.length < 3) {
      throw new Error('The shape must have at least 3 points');
    }
    this.color = color;
    this.filled = filled;
    this.points = points;
  };

  abstract getType(): string;

  public toString(): string {
    const filledText = this.filled ? 'filled' : 'not filled';
    const pointsToString = this.points.map(point => ` ${point.toString()}`);
    return `A Shape with color of ${this.color} and ${filledText}. Points:${pointsToString}.`
  }

  public getPerimeter(): number {
    const points = this.points;
    const pointsLength = points.length;
    let result = 0;

    for(let index = 0; index < pointsLength; index++) {
      const firstPoint = points[index == 0 ? pointsLength-1 : index-1];
      const secondPoint = points[index];

      result += firstPoint.distance(secondPoint);
    }

    return result;
  }
}
