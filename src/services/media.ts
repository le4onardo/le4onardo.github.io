
export const fetchVideoInMedia = async (url: string): Promise<HTMLVideoElement> => {
    const media = document.createElement('video') as HTMLVideoElement;
    media.crossOrigin = '';
    media.src = url;
    media.muted = true;
    media.autoplay = true;
    media.loop = true;

    const promise = new Promise<HTMLVideoElement>((resolve, reject) => {
        media.onloadeddata = function () {
            console.log('LOADED DATA! ' + url, media.readyState)
            resolve(media);
        };
        media.onerror = function () {
            reject('load error');
        };
    });

    media.load();

    return promise;
}
