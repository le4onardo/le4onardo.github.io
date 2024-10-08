import { useRef, useEffect, memo } from 'react';
import './PixiBackground.css';
import { Application, Sprite, Texture, Ticker } from 'pixi.js';
import AsciiFilter from 'pixi-ascii';
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
      ascii: AsciiFilter
    }, loading: boolean
  ) => void,
}



// TODO: check pixi react library
const PixiBackground: React.FC<Props> = ({ height, width, videoData, ticker, nextVideoData, asciiSize = 1 }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spriteRef = useRef<Sprite>();
  const pixiRef = useRef<Application>();
  const loading = useRef<boolean>(false);
  const mediaRequest = useRef<Promise<HTMLVideoElement>>();
  const filtersRef = useRef<{
    crt: CRTFilter,
    ascii: AsciiFilter,
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
    } catch (error) {
      console.log('new video load failed', videoData.url);
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
      const ascii = new AsciiFilter();
      const glitch = new GlitchEmisorFilter();

      spriteRef.current = sprite;
      filtersRef.current = { crt, glitch, ascii };

      backSprite.width = canvas.width;
      backSprite.height = canvas.height;

      crt.noise = 0;
      crt.curvature = 0;
      crt.lineWidth = 0;
      crt.lineContrast = 0;
      crt.seed = 0;
      crt.time = 0;

      glitch.intensity = 0;
      glitch.offset = 100;
      glitch.slices = 100;

      ascii.charIndexes = [
        0, 96, 34, 94, 92, 93, 111, 110, 51, 98, 38, 72, 65, 66, 64, 48
      ];
      //ascii.backgroundColor = [0.062, 0.062, 0.105, 1.0];

      pixiApp.stage.addChild(backSprite);
      pixiApp.stage.addChild(sprite);
      sprite.filters = [crt, ascii];
      pixiApp.stage.filters = [glitch];

      setTimeout(() => glitch.startGlitch(), 100);
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
      if (!filtersRef.current) return;
      const x = event.movementX;
      const y = event.movementY;
      const increment = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        / (window.innerWidth + window.innerHeight) / 6;

      filtersRef.current.glitch.intensity = Math.min(
        filtersRef.current.glitch.intensity + increment,
        0.3
      );
    };
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);


  useEffect(() => {
    loadVideoInCanvas();
  }, [videoData]);


  useEffect(() => {
    const { ascii } = filtersRef.current!;
    ascii.size = asciiSize;
  }, [asciiSize]);

  return <canvas className='pixi-background' ref={canvasRef} />;
};

export default memo(PixiBackground);
