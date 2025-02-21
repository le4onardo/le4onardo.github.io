
import Repeater from '../../Repeater';
import { CRTFilter, CRTFilterOptions } from 'pixi-filters';

export default class CRTEmisorFilter extends CRTFilter {
    private rangeOptions: Partial<CRTFilterOptions>;
    private repeater?: Repeater;
    private _intensity = 0;
    private _defaultOptions?: Partial<CRTFilterOptions>;

    constructor(
        options?: Partial<CRTFilterOptions>,
        rangeOptions?: Partial<CRTFilterOptions>,
        intensity = 0
    ) {
        super(options);

        this.rangeOptions = rangeOptions || {};
        this._intensity = intensity;
        this._defaultOptions = options;
    }

    public get intensity() {
        return this._intensity;
    }

    public set intensity(intensity: number) {
        this._intensity = intensity;
    }

    public set defaultOptions(defaultOptions: Partial<CRTFilterOptions>) {
        this._defaultOptions = defaultOptions
    }


    private getRandomLineWidth(intensity = 1) {
        const weight = 3
        const offset = 4

        return (weight * Math.random() + offset) * intensity;
    }

    private getRandomLineContrast(intensity = 1) {
        const weight = 1
        const offset = 0.5

        return (weight * Math.random() + offset) * intensity;
    }

    private getRandomCurvature(intensity = 1) {
        const weight = 20
        const offset = 10

        return (weight * Math.random() + offset) * intensity;
    }

    private getRandomVignetting(intensity = 1) {
        const weight = 0.05
        const offset = this._defaultOptions?.vignetting || 0

        return weight * Math.random() * intensity + offset;
    }

    private getRandomVignettingBlur(intensity = 1) {
        const weight = 0.1
        const offset = this._defaultOptions?.vignettingBlur || 0;

        return weight * Math.random() * intensity + offset;
    }


    public applyRandomGlitch = () => {
        this.seed = Math.random();
        this.curvature = this.getRandomCurvature(this.intensity);
        this.lineWidth = this.getRandomLineWidth(this.intensity);
        this.lineContrast = this.getRandomLineContrast(this.intensity);
        this.vignetting = this.getRandomVignetting(this.intensity);
        this.vignettingBlur = this.getRandomVignettingBlur(this.intensity);
        this.noise = this.intensity;

    };

    public startGlitch(duration = 0) {
        if (!!this.repeater) return;

        this.repeater = new Repeater();
        this.repeater.start(this.applyRandomGlitch, duration);
    }

    public stopGlitch() {
        this.repeater?.stop();
        this.repeater = undefined;
    }
}
