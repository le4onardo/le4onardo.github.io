import { useRef, useEffect, memo } from 'react';
import './PixiBackground.css';
import { Application, Sprite, Texture, Ticker } from 'pixi.js';
import AsciiFilter from 'pixi-ascii';
import { CRTFilter } from 'pixi-filters';
import GlitchEmisorFilter from '../../../utils/pixi-utils/GlitchEmitterFilter/GlitchEmisorFilter';
import { AssestType } from '../../../utils/data';


async function fetchVideoInMedia(url: string) {
  const media = document.createElement('video') as HTMLVideoElement;
  media.crossOrigin = '';
  media.src = url;
  media.muted = true;
  media.autoplay = true;
  media.loop = true;

  const promise = new Promise((resolve, reject) => {
    media.onloadeddata = function () {
      resolve(media);
    };
    media.onerror = function () {
      reject('load error');
    };
  });

  media.load();
  console.log('load requested');
  return promise;
}

function resizeSprite(newWidth: number, newHeight: number, sprite: Sprite) {
  // INFO: changing constant changes sprite size keeping aspect ratio
  // sprite.scale.x = (canvasEl.current!.clientWidth / texture.width) * 0.75;
  // sprite.scale.y = (canvasEl.current!.clientWidth / texture.width) * 0.75;
  sprite.scale.x = ((newWidth + 1) / sprite.texture.width) * 0.75;
  sprite.scale.y = ((newWidth + 1) / sprite.texture.width) * 0.75;
  console.log('dimensions', newWidth, newHeight, sprite.texture.width);

  // INFO: height correction needed for cut chars on some heights
  const intHeight = Math.floor(sprite.height);
  if (intHeight % 4 !== 0) {
    sprite.height = intHeight + 4 - (intHeight % 4);
  }
  console.log(sprite.height);
  // INFO: centers media in sprite
  sprite.x = (newWidth - sprite.width) / 2;
  sprite.y = (newHeight - sprite.height) / 2;
}

interface Props {
  height: number;
  width: number;
  videoData: AssestType;
  asciiSize?: number;
  ticker?: (glitchFilter: GlitchEmisorFilter, crtFilter: CRTFilter, asciiFilter: AsciiFilter) => void,
}

const MAX_GLITCH_INDEX = 0.3

// TODO: check pixi react library
const PixiBackground: React.FC<Props> = ({ height, width, videoData, ticker, asciiSize = 1 }: Props) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const sprite = useRef<Sprite>();
  const crtFilter = useRef<CRTFilter>();
  const asciiFilter = useRef<AsciiFilter>();
  const glitchFilter = useRef<GlitchEmisorFilter>();
  const pixiApp = useRef<Application>();
  const loading = useRef<boolean>(false);

  const loadVideoInCanvas = async () => {
    try {
      loading.current = true;
      const media = await fetchVideoInMedia(videoData.url) as HTMLVideoElement;
      const texture = Texture.from(media);
      sprite.current!.texture = texture;
      resizeSprite(width, height, sprite.current!);

      crtFilter.current!.vignetting = videoData.crtVignetting;
      crtFilter.current!.vignettingAlpha =
        videoData.crtVignettingAlpha
      crtFilter.current!.vignettingBlur = videoData.crtVignettingBlur;
    } catch (error) {
      console.log('new video load failed', videoData.url);
    } finally {
      setTimeout(() => (loading.current = false), 1000);
    }
  }

  useEffect(() => {
    pixiApp.current = new Application({
      view: canvasEl.current!,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      // backgroundColor: 0x10101b,
      // TODO: "width" correction needed for cut chars on some widths
      width: width,
      height: height
    });

    async function main() {
      const backSprite = new Sprite();
      sprite.current = new Sprite();
      crtFilter.current = new CRTFilter();
      asciiFilter.current = new AsciiFilter();
      glitchFilter.current = new GlitchEmisorFilter();

      backSprite.width = canvasEl.current!.clientWidth;
      backSprite.height = canvasEl.current!.clientHeight;

      crtFilter.current.noise = 0;
      crtFilter.current.curvature = 0;
      crtFilter.current.lineWidth = 0;
      crtFilter.current.lineContrast = 0;
      crtFilter.current.seed = 0;
      crtFilter.current.time = 0;

      glitchFilter.current.intensity = 0;
      glitchFilter.current.offset = 100;
      glitchFilter.current.slices = 100;

      asciiFilter.current.charIndexes = [
        0, 96, 34, 94, 92, 93, 111, 110, 51, 98, 38, 72, 65, 66, 64, 48
      ];
      //ascii.backgroundColor = [0.062, 0.062, 0.105, 1.0];

      pixiApp.current!.stage.addChild(backSprite);
      pixiApp.current!.stage.addChild(sprite.current);

      sprite.current.filters = [crtFilter.current, asciiFilter.current];
      pixiApp.current!.stage.filters = [glitchFilter.current];

      setTimeout(() => glitchFilter.current!.startGlitch(), 100);
      console.log('main executed');
    }

    const onMouseMove = (event: MouseEvent) => {
      const x = event.movementX;
      const y = event.movementY;
      const increment = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

      glitchFilter.current!.intensity = Math.min(
        glitchFilter.current!.intensity + increment / 12000, //* (0.5 - increment),
        MAX_GLITCH_INDEX
      );
    };
    document.onmousemove = onMouseMove;

    pixiApp.current.loader.load(main);
    pixiApp.current.ticker.maxFPS = 30;
    pixiApp.current.ticker.add(async (_delta) => {
      if (loading.current) {
        glitchFilter.current!.intensity = MAX_GLITCH_INDEX;
        return;
      }
      ticker && ticker(glitchFilter.current!, crtFilter.current!, asciiFilter.current!);

      // Smooth glitch reduction effect over time
      glitchFilter.current!.intensity = Math.max(glitchFilter.current!.intensity - 0.005, 0);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      pixiApp.current!.destroy(false, true);
    }
  }, []);

  useEffect(() => {
    console.log('new Video', videoData.url);
    loadVideoInCanvas();
  }, [videoData]);

  useEffect(() => {
    asciiFilter.current!.size = asciiSize;
  }, [asciiSize]);

  return <canvas className='pixi-background' ref={canvasEl} />;
};

export default memo(PixiBackground);
