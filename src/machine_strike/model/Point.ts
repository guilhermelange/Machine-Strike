class Point {
    x: number;
    y: number;

    constructor(...args: any[]) {
        this.x = args[0] as number;
        this.y = args[1] as number;
    }

    get coor(): number[] {
        return [this.x, this.y]
    }

    equals(obj: Point) {
        if (this.x == obj.x && this.y == obj.y) {
            return true;
        }
        return false;
    }

    toString() {
        return `(${this.x},${this.y})`
    }
}

export default Point