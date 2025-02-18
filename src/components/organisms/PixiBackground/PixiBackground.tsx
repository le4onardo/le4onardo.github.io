import { useRef, useEffect, memo } from 'react';
import './PixiBackground.css';
import { Application, Sprite, Texture, Ticker } from 'pixi.js';
import { CRTFilter } from 'pixi-filters';
import GlitchEmisorFilter from '../../../utils/pixi-utils/GlitchEmitterFilter/GlitchEmisorFilter';
import { AssestType } from '../../../utils/data';
import { fetchVideoInMedia } from '../../../services/media';

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
      crt: CRTFilter,
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
    crt: CRTFilter,
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

      crt.vignetting = videoData.crtVignetting;
      crt.vignettingAlpha = videoData.crtVignettingAlpha
      crt.vignettingBlur = videoData.crtVignettingBlur;

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
      const crt = new CRTFilter();
      const glitch = new GlitchEmisorFilter({ slices: 500, offset: 0 });

      spriteRef.current = sprite;
      filtersRef.current = { crt, glitch };

      backSprite.width = canvas.width;
      backSprite.height = canvas.height;

      crt.noise = 0;
      crt.curvature = 0;
      crt.lineWidth = 0;
      crt.lineContrast = 0;
      crt.seed = 0;
      crt.time = 0;

      pixiApp.stage.addChild(backSprite);
      pixiApp.stage.addChild(sprite);
      sprite.filters = [crt];
      pixiApp.stage.filters = [glitch];

      setTimeout(() => glitch.startGlitch(), 100);

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
      const { glitch } = filtersRef.current || {};

      if (!glitch || loading.current) return;

      const x = event.movementX;
      const y = event.movementY;
      const increment = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        / (window.innerWidth + window.innerHeight) / 6;

      glitch.intensity = Math.min(
        glitch.intensity + increment,
        0.3
      );
    };
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);


  useEffect(() => {
    loadVideoInCanvas();
  }, [videoData]);


  return <canvas className='pixi-background' ref={canvasRef} />;
};

export default memo(PixiBackground);
