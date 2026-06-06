export class RoundUtil {
  static round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
