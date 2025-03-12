import { useRef, useEffect, memo } from 'react';
import { Application, Sprite, Texture, Ticker } from 'pixi.js';
import { CRTFilter, OldFilmFilter } from 'pixi-filters';
import GlitchEmisorFilter from '../../../utils/pixi-utils/GlitchEmitterFilter/GlitchEmisorFilter';
import { AssestType } from '../../../utils/data';
import { fetchVideoInMedia } from '../../../services/media';
import CRTEmisorFilter from '../../../utils/pixi-utils/CRTEmitterFilter/CRTEmitterFilter';

function resizeSprite(newWidth: number, newHeight: number, sprite: Sprite) {
  // INFO: changing sprite size to keep aspect ratio. Only to 75% of new width.
  sprite.scale.x = ((newWidth + 1) / sprite.texture.width) * 0.75;
  sprite.scale.y = ((newWidth + 1) / sprite.texture.width) * 0.75;
  // console.log('dimensions', newWidth, newHeight, sprite.texture.width);

  // INFO: height correction needed for cut chars on some heights
  const intHeight = Math.floor(sprite.height);
  if (intHeight % 4 !== 0) {
    sprite.height = intHeight + 4 - (intHeight % 4);
  }
  // console.log(sprite.height, sprite.width);
  // INFO: centers media in sprite
  sprite.x = (newWidth - sprite.width) / 2;
  sprite.y = (newHeight - sprite.height) / 2;
}

interface Props {
  height: number;
  width: number;
  videoData: AssestType;
  nextVideoData?: AssestType;
  asciiSize?: number;
  ticker?: (
    filters: {
      glitch: GlitchEmisorFilter,
      crt: CRTEmisorFilter,
    }, loading: boolean
  ) => void,
}



// TODO: check pixi react library
const PixiBackground: React.FC<Props> = ({ height, width, videoData, ticker, nextVideoData }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spriteRef = useRef<Sprite>();
  const pixiRef = useRef<Application>();
  const loading = useRef<boolean>(false);
  const mediaRequest = useRef<Promise<HTMLVideoElement | HTMLImageElement>>();
  const filtersRef = useRef<{
    crt: CRTEmisorFilter,
    glitch: GlitchEmisorFilter
  }>();


  const loadVideoInCanvas = async () => {
    try {
      const sprite = spriteRef.current!;
      const { crt } = filtersRef.current!;
      // const { width, height } = canvasRef.current!;
      loading.current = true;

      const media = (await mediaRequest.current)!;
      const texture = Texture.from(media);
      sprite.texture = texture;
      resizeSprite(width, height, sprite);

      canvasRef.current!.style.opacity = "1";
    } catch (error) {
      console.log('video load failed', videoData.url, error);
    } finally {
      if (nextVideoData) {
        mediaRequest.current = fetchVideoInMedia(nextVideoData.url);
      }
      loading.current = false;
    }
  }


  useEffect(() => {
    const canvas = canvasRef.current!
    const pixiApp = new Application({
      view: canvas,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      // backgroundAlpha: 0,
      // backgroundColor: 0x10101b,
      width: width,
      height: height
      // resizeTo: canvas.parentElement as HTMLElement
    });
    pixiRef.current = pixiApp;


    async function onPixiInit() {
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
      // const oldFilm = new OldFilmFilter({ vignetting: 0, vignettingAlpha: 0, vignettingBlur: 0 });

      spriteRef.current = sprite;
      filtersRef.current = { crt, glitch };

      backSprite.width = canvas.width;
      backSprite.height = canvas.height;


      pixiApp.stage.addChild(backSprite);
      pixiApp.stage.addChild(sprite);
      sprite.filters = [crt];
      pixiApp.stage.filters = [glitch];

      setTimeout(() => glitch.startGlitch(), 100);
      crt.startGlitch();

      /*
      sprite.texture = Texture.from(videoData.backgroundUrl);
      setTimeout(() => resizeSprite(width, height, sprite), 100);
      */
    }

    pixiApp.loader.load(onPixiInit);
    pixiApp.ticker.maxFPS = 30;
    // start first video load
    mediaRequest.current = fetchVideoInMedia(videoData.url);
    return () => {
      pixiApp.destroy(false, true);
    }
  }, []);

  useEffect(() => {
    const defaultTicker = async (_delta: number) => {
      ticker && ticker(filtersRef.current!, loading.current);

      /* resize (experimental)
      if (pixiApp.screen.width !== canvasEl.current!.parentElement!.clientWidth) {
        resizeSprite(
          canvasEl.current!.parentElement!.clientWidth,
          canvasEl.current!.parentElement!.clientHeight,
          sprite.current!
        );
      }*/
    }
    pixiRef.current?.ticker?.add(defaultTicker);

    return () => { pixiRef.current?.ticker?.remove(defaultTicker) };
  }, [ticker]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { glitch, crt } = filtersRef.current || {};

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
    const onMouseClick = () => {
      const { crt } = filtersRef.current || {};

      if (!crt || loading.current) return;

      crt.intensity = Math.min(crt.intensity + 0.2, 1);
    }
    document.addEventListener('click', onMouseClick);
    return () => document.removeEventListener('click', onMouseClick);
  }, [])


  useEffect(() => {
    loadVideoInCanvas();
  }, [videoData]);


  return <canvas className='pixi-background absolute top-0 left-0 opacity-0' ref={canvasRef} />;
};

export default memo(PixiBackground);
