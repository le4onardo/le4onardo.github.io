
export const fetchVideoInMedia = async (url: string) => {
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
