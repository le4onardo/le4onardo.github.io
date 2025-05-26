import { useRef, useEffect, memo } from 'react';
import {
  Application, Sprite, Texture, Ticker, Assets,
  DisplacementFilter,
  Container,
  Filter,
} from 'pixi.js';
import { ShockwaveFilter } from 'pixi-filters';
import GlitchEmisorFilter from '../../../utils/pixi-utils/GlitchEmitterFilter/GlitchEmisorFilter';
import { AssestType } from '../../../utils/data';
import { fetchVideoInMedia } from '../../../services/media';
import CRTEmisorFilter from '../../../utils/pixi-utils/CRTEmitterFilter/CRTEmitterFilter';
import { twMerge } from 'tailwind-merge';


function resizeSprite(newWidth: number, newHeight: number, sprite: Sprite) {
  // INFO: changing sprite size to keep aspect ratio. Only to 75% of new width.
  sprite.scale.x = (newWidth / sprite.texture.width) * 0.75;
  sprite.scale.y = (newWidth / sprite.texture.width) * 0.75;
  // console.log('dimensions', newWidth, newHeight, sprite.texture.width);

  // console.log(sprite.height, sprite.width);
  // INFO: centers media in sprite
  sprite.anchor = 0.5
  sprite.x = newWidth / 2;
  sprite.y = newHeight / 2;
}

interface FiltersType {
  crt?: CRTEmisorFilter,
  glitch?: GlitchEmisorFilter,
  wave?: ShockwaveFilter,
  displacement?: DisplacementFilter,
}

interface Props {
  className?: string;
  height: number;
  width: number;
  videoData: AssestType;
  nextVideoData?: AssestType;
  asciiSize?: number;
  ticker?: (filters: FiltersType, loading: boolean) => void,
}


// TODO: check pixi react library
const PixiBackground: React.FC<Props> = ({ height, width, videoData, ticker, nextVideoData, className }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spriteRef = useRef<Sprite>();
  const pixiRef = useRef<Application>();
  const loading = useRef<boolean>(false);
  const mediaRequest = useRef<Promise<HTMLVideoElement | HTMLImageElement>>();
  const filtersRef = useRef<FiltersType>();
  const dispEpsilon = useRef(0);
  const disSpriteRef = useRef<Sprite>();
  const inertiaX = useRef(0);
  const inertiaEpsilon = useRef(0);

  const loadVideoInCanvas = async () => {
    try {
      const sprite = spriteRef.current!;
      mediaRequest.current = fetchVideoInMedia(videoData.url);
      // const { width, height } = canvasRef.current!;
      loading.current = true;

      const media = (await mediaRequest.current)!;
      // const texture = Texture.from(media);
      console.log('filter object', filtersRef.current, media);
      pixiRef.current?.stage.removeChild(sprite);
      spriteRef.current = Sprite.from(media);
      const { crt, displacement } = filtersRef.current || {};
      console.log('media loaded', crt, displacement);

      resizeSprite(width, height, spriteRef.current);
      pixiRef.current?.stage.addChild(spriteRef.current);
      // @ts-ignore
      // (spriteRef.current.texture.source as HTMLVideoElement)
      // media.currentTime = 10;


      disSpriteRef.current!.position = spriteRef.current.position;
      spriteRef.current.filters = [crt!, displacement!];

      console.log('dis filter', displacement);
      canvasRef.current!.style.opacity = "1";
    } catch (error) {
      console.log('video load failed', videoData.url, error);
    } finally {
      /*if (nextVideoData) {
        mediaRequest.current = fetchVideoInMedia(nextVideoData.url);
      }*/
      loading.current = false;
    }
  }


  useEffect(() => {
    const canvas = canvasRef.current!
    if (pixiRef.current) return;

    pixiRef.current = new Application();
    const pixiApp = pixiRef.current;

    async function onPixiInit() {
      await pixiApp.init({
        canvas,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        // backgroundAlpha: 0,
        // backgroundColor: 0x10101b,
        width: width,
        height: height,
        // resizeTo: window, // canvas.parentElement as HTMLElement
      });
      console.log('INIT');
      const container = new Container();
      const backSprite = new Sprite();
      const sprite = new Sprite();
      const crt = new CRTEmisorFilter({
        vignetting: 0.5,
        vignettingAlpha: 1,
        vignettingBlur: 0.25,
        noiseSize: 1,
        seed: Math.random(),
        time: 0,
      });
      const glitch = new GlitchEmisorFilter({ slices: 500, offset: 0 }, {
        red: [200, 200],
        green: [200, 200],
        blue: [200, 200],
      });
      const wave = new ShockwaveFilter({ speed: 500 });
      const disTexture = await Assets.load(
        // 'https://i.postimg.cc/vMctwLrd/imageedit-1-9908423851.jpg?dl=1'
        'https://pixijs.io/examples/examples/assets/pixi-filters/displacement_map_repeat.jpg'
      );

      const disSprite = new Sprite(disTexture);

      disSprite.texture.source.wrapMode = 'repeat';
      const displacement = new DisplacementFilter({ sprite: disSprite });

      disSpriteRef.current = disSprite;
      spriteRef.current = sprite;
      filtersRef.current = {
        crt, glitch, wave,
        displacement
      };

      backSprite.width = canvas.width;
      backSprite.height = canvas.height;

      pixiApp.stage.addChild(container);

      container.addChild(backSprite);
      container.addChild(sprite);

      pixiApp.stage.addChild(disSpriteRef.current);


      pixiApp.stage.filters = [
        glitch,
        displacement,
        // wave,
      ];

      setTimeout(() => glitch.startGlitch(), 100);
      crt.startGlitch();

      /*
      sprite.texture = Texture.from(videoData.backgroundUrl);
      setTimeout(() => resizeSprite(width, height, sprite), 100);
      */


    }
    onPixiInit();

    // pixiApp.ticker.maxFPS = 30;
    // start first video load;
    return () => {
      /*pixiStateRef.current.then(() => {
        pixiApp?.destroy(false, true);
        console.log('DESTROYED');
      });*/
    }
  }, []);

  useEffect(() => {
    let iterator = 0;
    const defaultTicker = async (tick: any) => {
      ticker && ticker(filtersRef.current!, loading.current);
      if (!filtersRef.current) return;


      const waves = (pixiRef.current?.stage.filters as ShockwaveFilter[]).slice(2);
      waves.forEach(wave => {
        if (!wave._uniformBindMap) return;

        if (0 <= wave.time && wave.time < 4) {
          wave.time += 0.03;
        } else {
          wave.time = -1;
        }
      });


      if (disSpriteRef.current && filtersRef.current.displacement) {
        const disSprite = disSpriteRef.current;
        // disSprite.x--;
        disSprite.y++;
        filtersRef.current.displacement.scale.x = 0;
        filtersRef.current.displacement.scale.y = 0;
        // Reset x to 0 when it's over width to keep values from going to very huge numbers.
        if (disSprite.x > disSprite.width) {
          disSprite.x = 0;

        }
        if (disSprite.y > disSprite.height) {
          disSprite.y = 0;
        }
      }

      dispEpsilon.current = Math.max(dispEpsilon.current - 0.01, 0);
      iterator += 0.5;
      if (dispEpsilon.current === 0) {
        iterator = 0;
      }

      // console.log(filtersRef.current!.wave);

      /* resize (experimental)
    
      if (pixiApp.screen.width !== canvasEl.current!.parentElement!.clientWidth) {
        resizeSprite(
          canvasEl.current!.parentElement!.clientWidth,
          canvasEl.current!.parentElement!.clientHeight,
          sprite.current!
        );
      }*/
    }
    Ticker.shared.add(defaultTicker);

    const inertiaTicker = async (tick: Ticker) => {
      if (inertiaEpsilon.current == 0) return;

      const media = (await mediaRequest.current) as HTMLVideoElement;

      let time = media.currentTime + inertiaEpsilon.current + (tick.elapsedMS / 1000);
      if (time > media.duration)
        time = time - media.duration;
      else if (time < 0)
        time = media.duration + time;
      media.currentTime = time;

      if (Math.abs(inertiaEpsilon.current) < 0.01) {
        inertiaEpsilon.current = 0;
        console.log('epsilon 0');
      }
      else {
        inertiaEpsilon.current = inertiaEpsilon.current * 0.95;
      }
      console.log('interia ticker', media.currentTime);

    }
    Ticker.shared.add(inertiaTicker);
    return () => { Ticker.shared.remove(defaultTicker); Ticker.shared.remove(inertiaTicker); };
  }, [ticker]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { glitch, crt, displacement } = filtersRef.current || {};

      if (!glitch || !crt || loading.current) return;

      const x = event.movementX;
      const y = event.movementY;
      const increment = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        / (window.innerWidth + window.innerHeight) / 6;

      glitch.intensity = Math.min(
        glitch.intensity + increment,
        0.3
      );
      crt.intensity = Math.min(crt.intensity + increment * 6, 1);
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);


  useEffect(() => {
    loadVideoInCanvas();
  }, [videoData]);

  const onClick = async (e: React.MouseEvent) => {
    const canvas = e.target as HTMLCanvasElement;
    const { top, left } = canvas.getBoundingClientRect()
    const x = e.clientX - left;
    const y = e.clientY - top;

    console.log(canvas.getBoundingClientRect());
    console.log(x, y);

    if (filtersRef.current?.wave && pixiRef.current) {
      const wave = new ShockwaveFilter({ speed: 300 });
      wave.center = [x, y];
      wave.wavelength = 150;
      wave.amplitude = 15;
      const filters = pixiRef.current!.stage.filters as Filter[];
      pixiRef.current!.stage.filters = filters.concat(wave);

      setTimeout(() => {
        pixiRef.current!.stage.filters = (pixiRef.current!.stage.filters as Filter[])
          .filter(f => f !== wave);
        console.log(pixiRef.current!.stage.filters);
        wave.destroy();
      }, 3200);

      dispEpsilon.current = 1;
    }
  }
  const onMouseDown = (e: React.MouseEvent) => {
    inertiaX.current = e.clientX;
  }
  const onMouseMove = async (e: React.MouseEvent) => {
    if (inertiaX.current === 0) return;

    const delta = inertiaX.current - e.clientX;
    console.log(inertiaX.current, e.clientX, inertiaEpsilon.current);
    inertiaEpsilon.current += delta / 50;
    inertiaX.current = e.clientX;
  }

  const onMouseUp = (e: React.MouseEvent) => {
    inertiaX.current = 0;
  }

  return <canvas
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
    onMouseOut={onMouseUp}
    className={twMerge('absolute top-0 left-0 opacity-0 !cursor-pointer', className)}
    ref={canvasRef}
  // onClick={onClick}
  />;
};

export default memo(PixiBackground);
