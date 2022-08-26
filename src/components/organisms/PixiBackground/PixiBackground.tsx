import { useRef, useEffect, memo } from 'react';
import './PixiBackground.css';
import { Application, Sprite, Container, Loader, Texture } from 'pixi.js';
import { assets, crtConfig } from '../../../assets';
import AsciiFilter from 'pixi-ascii';
import { CRTFilter, ColorReplaceFilter } from 'pixi-filters';
import GlitchEmisorFilter from '../../atoms/GlitchEmitterFilter/GlitchEmisorFilter';

const PixiBackground = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const randomVideo = 4; //Math.ceil(Math.random() * 8);
    console.log(randomVideo);
    const app = new Application({
      view: canvasEl.current!,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      // backgroundColor: 0x10101b,
      width: 1000,
      height: 600
    });
    let sprite: Sprite;
    let texture: Texture;
    function main(loader: Loader, resources: any) {
      const media = resources['video' + randomVideo].data as any;

      if (media.nodeName === 'VIDEO') {
        media.muted = true;
        media.autoplay = true;
        media.loop = true;
      }
      texture = Texture.from(media);
      sprite = new Sprite(texture);
      const backSprite = new Sprite();
      backSprite.width = canvasEl.current!.clientWidth;
      backSprite.height = canvasEl.current!.clientHeight;

      app.stage.addChild(backSprite);
      sprite.scale.x = (canvasEl.current!.clientWidth / texture.width) * 0.8;
      sprite.scale.y = (canvasEl.current!.clientWidth / texture.width) * 0.8;
      sprite.x = (1000 - sprite.width) / 2;
      sprite.y = (600 - sprite.height) / 2;

      const ascii = new AsciiFilter();
      const glitch = new GlitchEmisorFilter();
      glitch.intensity = 0;
      ascii.size = 5;

      setTimeout(() => (ascii.size = 4), 2000);
      setTimeout(() => (ascii.size = 3), 4000);
      setTimeout(() => (ascii.size = 2), 6000);
      setTimeout(() => (ascii.size = 1), 8000);
      //ascii.backgroundColor = [0.062, 0.062, 0.105, 1.0];
      const crtFilter = new CRTFilter({
        noise: 0,
        curvature: 0,
        lineWidth: 0,
        lineContrast: 0,
        seed: 0,
        time: 0,
        ...crtConfig[randomVideo - 1]
      });

      ascii.charIndexes = [
        0, 96, 34, 94, 92, 93, 111, 110, 51, 98, 38, 72, 65, 66, 64, 48
      ];
      app.stage.addChild(sprite);

      sprite.filters = [crtFilter, ascii];
      app.stage.filters = [glitch];
      console.log('stage dimensions', app.stage.width, app.stage.height);
      setTimeout(() => glitch.startGlitch(), 100);
      console.log(
        'canvas dimensions',
        canvasEl.current!.clientWidth,
        canvasEl.current!.clientHeight
      );
      document.onmousemove = (event: MouseEvent) => {
        const percentage =
          (Math.abs(event.movementX) + Math.abs(event.movementY)) /
          (window.innerWidth + window.innerHeight);
        glitch.intensity = percentage * 4;
      };
      console.log('texture dimensions', texture.width, texture.height);
      console.log(
        'back sprite dimensions',
        backSprite.width,
        backSprite.height
      );
      console.log('sprite dimensions', sprite.width, sprite.height);
    }

    app.loader.add([assets[randomVideo - 1]]).load(main);
  });

  return <canvas className='pixi-background' ref={canvasEl} />;
};

export default memo(PixiBackground);
