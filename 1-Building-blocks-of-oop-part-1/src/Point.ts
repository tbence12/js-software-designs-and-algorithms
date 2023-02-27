export class Point {
  private x: number;
  private y: number;

  constructor();
  constructor(x: number, y: number);

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  distance(): number;
  distance(x: number, y: number): number;
  distance(other: Point): number;

  public distance(x?: number | Point, y?: number): number {
    let secondX: number;
    let secondY: number;

    if (x instanceof Point) {
      secondX = x.x;
      secondY = x.y;
    } else if (x && y) {
      secondX = x;
      secondY = y;
    } else {
      secondX = 0;
      secondY = 0;
    }

    return this.calculateDistance(secondX, secondY);
  };

  // distance = √((x2 – x1)² + (y2 – y1)²)
  private calculateDistance(secondX: number, secondY: number): number {
    const xOnASquare = Math.pow(secondX - this.x, 2);
    const yOnASquare = Math.pow(secondY - this.y, 2);
    return Math.sqrt(xOnASquare + yOnASquare)
  }
}
