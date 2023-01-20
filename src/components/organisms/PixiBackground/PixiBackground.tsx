import { useRef, useEffect, memo } from 'react';
import './PixiBackground.css';
import { Application, Sprite, Texture } from 'pixi.js';
import { assets } from '../../../assets';
import AsciiFilter from 'pixi-ascii';
import { CRTFilter } from 'pixi-filters';
import GlitchEmisorFilter from '../../atoms/GlitchEmitterFilter/GlitchEmisorFilter';

// TODO: check pixi react library 
const PixiBackground = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const spriteHeight = 700;
  const spriteWidth = 1400;

  useEffect(() => {
    const app = new Application({
      view: canvasEl.current!,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      // backgroundColor: 0x10101b,
      // INFO: width correction needed for cut chars on some widths
      width: spriteWidth + 1,
      height: spriteHeight
    });
    let sprite: Sprite;
    let glitch: GlitchEmisorFilter;
    let loading = false;
    let glitchCounter = 0;
    let crtFilter: CRTFilter;

    async function loadRandomVideo(
      sprite: Sprite,
      crtFilter: CRTFilter,
      index?: number
    ) {
      const randomIndex =
        index === undefined ? Math.floor(Math.random() * assets.length) : index;
      const media = document.createElement('video') as HTMLVideoElement;
      media.crossOrigin = '';
      media.src = assets[randomIndex].url;
      media.muted = true;
      media.autoplay = true;
      media.loop = true;
      media.onloadeddata = function () {
        crtFilter.vignetting = assets[randomIndex].crtConfig.vignetting;
        crtFilter.vignettingAlpha =
          assets[randomIndex].crtConfig.vignettingAlpha;
        crtFilter.vignettingBlur = assets[randomIndex].crtConfig.vignettingBlur;
        const texture = Texture.from(media);
        sprite.texture = texture;

        // INFO: changing constant changes sprite size keeping aspect ratio
        sprite.scale.x = (canvasEl.current!.clientWidth / texture.width) * 0.75;
        sprite.scale.y = (canvasEl.current!.clientWidth / texture.width) * 0.75;
        console.log(sprite.height);

        // INFO: height correction needed for cut chars on some heights
        const intHeight = Math.floor(sprite.height);
        if (intHeight % 4 !== 0) {
          sprite.height = intHeight + 4 - (intHeight % 4);
        }
        console.log(sprite.height);
        // INFO: centers media in sprite
        sprite.x = (spriteWidth - sprite.width) / 2;
        sprite.y = (spriteHeight - sprite.height) / 2;
        setTimeout(() => (loading = false), 1000);
        console.log('video loaded');
      };
      media.onerror = function () {
        setTimeout(() => (loading = false), 1000);
        console.log('video load failed');
      };
      console.log('load requested');
      media.load();
    }
    function main() {
      const backSprite = new Sprite();
      backSprite.width = canvasEl.current!.clientWidth;
      backSprite.height = canvasEl.current!.clientHeight;
      app.stage.addChild(backSprite);
      const ascii = new AsciiFilter();
      glitch = new GlitchEmisorFilter({
        offset: 100,
        slices: 100
      });
      glitch.intensity = 0;
      ascii.size = 5;

      setTimeout(() => (ascii.size = 4), 2000);
      setTimeout(() => (ascii.size = 3), 4000);
      setTimeout(() => (ascii.size = 2), 6000);
      setTimeout(() => (ascii.size = 1), 8000);
      //ascii.backgroundColor = [0.062, 0.062, 0.105, 1.0];
      crtFilter = new CRTFilter({
        noise: 0,
        curvature: 0,
        lineWidth: 0,
        lineContrast: 0,
        seed: 0,
        time: 0
      });

      ascii.charIndexes = [
        0, 96, 34, 94, 92, 93, 111, 110, 51, 98, 38, 72, 65, 66, 64, 48
      ];
      sprite = new Sprite();
      app.stage.addChild(sprite);

      sprite.filters = [crtFilter, ascii];
      app.stage.filters = [glitch];
      setTimeout(() => glitch.startGlitch(), 100);
      loadRandomVideo(sprite, crtFilter, 19);
    }

    document.onmousemove = (event: MouseEvent) => {
      const x = event.movementX;
      const y = event.movementY;
      const increment = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      console.log(x, y, increment);
      glitch.intensity = Math.min(
        glitch.intensity + increment / 6000, //* (0.5 - increment),
        0.3
      );
    };
    app.loader.load(main);
    app.ticker.maxFPS = 30;
    app.ticker.add((delta) => {
      if (loading) {
        glitch.intensity = 0.3;
        return;
      }
      if (glitch.intensity === 0.3) glitchCounter++;
      else glitchCounter = Math.max(glitchCounter - 1, 0);
      if (glitchCounter >= 30) {
        glitchCounter = 0;
        loading = true;
        console.log('start async load', glitchCounter, delta);
        loadRandomVideo(sprite, crtFilter);
      }
      glitch.intensity = Math.max(glitch.intensity - 0.005, 0);
    });
  });

  return <canvas className='pixi-background' ref={canvasEl} />;
};

export default memo(PixiBackground);
