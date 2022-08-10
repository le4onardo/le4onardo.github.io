import { useRef, useEffect } from 'react';
import './PixiBackground.css';
import { Application, Sprite, Container, Loader, Texture } from 'pixi.js';
import assets from '../../../assets';
import AsciiFilter from 'pixi-ascii/src/AsciiFilter';
import { CRTFilter } from 'pixi-filters';

const PixiBackground = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const app = new Application({
      view: canvasEl.current!,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: 0x10101b,
      width: 900,
      height: 700
    });
    let sprite: Sprite;
    let texture: Texture;
    function main(loader: Loader, resources: any) {
      const conty: Container = new Container();
      conty.x = 0;
      conty.y = 0;
      app.stage.addChild(conty);
      const randomVideo = 'video' + Math.ceil(Math.random() * 8);
      console.log(randomVideo);
      const media = resources[randomVideo].data as any;

      if (media.nodeName === 'VIDEO') {
        media.muted = true;
        media.autoplay = true;
        media.loop = true;
      }

      texture = Texture.from(media);
      sprite = new Sprite(texture);
      sprite.x = 0;
      sprite.y = 0;
      sprite.scale.x = canvasEl.current!.clientWidth / texture.width;
      sprite.scale.y = canvasEl.current!.clientWidth / texture.width;

      console.log(
        canvasEl.current!.clientWidth,
        canvasEl.current!.clientHeight
      );
      console.log(texture.width, texture.height);
      console.log(sprite.width, sprite.height);
      console.log(window.innerWidth, window.innerHeight);

      const ascii = new AsciiFilter();
      ascii.size = 1;
      ascii.backgroundColor = [0.062, 0.062, 0.105, 1.0];
      const crtFilter = new CRTFilter({
        noise: 0,
        curvature: 0,
        lineWidth: 0,
        lineContrast: 0,
        seed: 0,
        time: 0,
        vignetting: 0.5,
        vignettingBlur: 0.3,
        vignettingAlpha: 0.9
      });
      ascii.charIndexes = [
        0, 96, 34, 94, 92, 93, 111, 110, 51, 98, 38, 72, 65, 66, 64, 48
      ];
      sprite.filters = [crtFilter, ascii];
      conty.addChild(sprite);
    }

    app.loader.add(assets).load(main);
  });

  return <canvas className='pixi-background' ref={canvasEl} />;
};

export default PixiBackground;
