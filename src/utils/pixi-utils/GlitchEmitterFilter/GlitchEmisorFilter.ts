import { GlitchFilter, GlitchFilterOptions } from '@pixi/filter-glitch';
import Repeater from './Repeater';

export default class GlitchEmisorFilter extends GlitchFilter {
  private rangeOptions: Partial<GlitchFilterOptions>;
  private repeater: Repeater;
  private _intensity = 1;

  constructor(
    options?: Partial<GlitchFilterOptions>,
    rangeOptions?: Partial<GlitchFilterOptions>
  ) {
    super(options);
    this.rangeOptions = rangeOptions || {};
    this.repeater = new Repeater();
  }

  public get intensity() {
    return this._intensity;
  }
  public set intensity(intensity: number) {
    this._intensity = intensity;
  }

  private getRandomOffset(intensity = 1) {
    const range =
      this.rangeOptions.offset || this.uniforms.dimensions[0] / 2;
    return Math.round(range * intensity);
  }

  private getRandomRed(intensity = 1) {
    const rangeX = this.rangeOptions.red
      ? (this.rangeOptions.red as number[])[0]
      : this.uniforms.dimensions[0] / 2;

    const rangeY = this.rangeOptions.red
      ? (this.rangeOptions.red as number[])[1]
      : this.uniforms.dimensions[1] / 4;

    return [
      Math.round(
        (rangeX * Math.random() - rangeX / 2) * intensity
      ),
      Math.round(
        (rangeY * Math.random() - rangeY / 2) * intensity
      )
    ];
  }

  private getRandomGreen(intensity = 1) {
    const rangeX = this.rangeOptions.green
      ? (this.rangeOptions.green as number[])[0]
      : this.uniforms.dimensions[0] / 2;

    const rangeY = this.rangeOptions.green
      ? (this.rangeOptions.green as number[])[1]
      : this.uniforms.dimensions[1] / 4;

    return [
      Math.round(
        (rangeX * Math.random() - rangeX / 2) * intensity
      ),
      Math.round(
        (rangeY * Math.random() - rangeY / 2) * intensity
      )
    ];
  }

  private getRandomBlue(intensity = 1) {
    const rangeX = this.rangeOptions.blue
      ? (this.rangeOptions.blue as number[])[0]
      : this.uniforms.dimensions[0] / 2;

    const rangeY = this.rangeOptions.blue
      ? (this.rangeOptions.blue as number[])[1]
      : this.uniforms.dimensions[1] / 4;
    return [
      Math.round(
        (rangeX * Math.random() - rangeX / 2) * intensity
      ),
      Math.round(
        (rangeY * Math.random() - rangeY / 2) * intensity
      )
    ];
  }

  public applyRandomGlitch = () => {
    this.refresh();
    this.shuffle();
    this.offset = this.getRandomOffset(this.intensity);
    this.red = this.getRandomRed(this.intensity);
    this.blue = this.getRandomBlue(this.intensity);
    this.green = this.getRandomGreen(this.intensity);
  };

  public startGlitch(duration = 0) {

    window.setInterval(this.applyRandomGlitch, 30);
    this.repeater.start(this.applyRandomGlitch, duration);
  }

  public stopGlitch() {
    this.repeater.stop();
  }
}
