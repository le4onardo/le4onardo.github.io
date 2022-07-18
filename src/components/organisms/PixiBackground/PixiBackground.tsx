import { useRef, useEffect } from 'react';
import './PixiBackground.css';
import { Application, Sprite, Container, Loader, Texture } from 'pixi.js';
import assets from '../../../assets';
import AsciiFilter from 'pixi-ascii/src/AsciiFilter';

const PixiBackground = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const app = new Application({
      view: canvasEl.current!,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: 0x10101b,
      width: 900,
      height: 1000
    });
    let sprite: Sprite;
    let texture: Texture;
    function main(loader: Loader, resources: any) {
      const conty: Container = new Container();
      conty.x = 0;
      conty.y = 0;
      app.stage.addChild(conty);

      const media = resources.video1.data as any;

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
      sprite.filters = [ascii];
      conty.addChild(sprite);
    }

    app.loader.add(assets).load(main);
    window.onresize = () => {
      sprite.scale.x = canvasEl.current!.clientWidth / texture.width;
      sprite.scale.y = canvasEl.current!.clientWidth / texture.width;
    };
  });

  return <canvas className='pixi-background' ref={canvasEl} />;
};

export default PixiBackground;
