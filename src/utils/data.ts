export const cardsData: {
    title: string,
    description: string,
    writeDate: Date,
    readTime: number // minutes
}[] = [

        {
            title: 'my little title <3',
            description: 'this is a long long description for a this card, lululu lalala qwerty',
            writeDate: new Date('10/22/2023'),
            readTime: 5
        }, {
            title: 'Other title',
            description: 'another a long long description for a this card without meaning, lululu lalala qwerty,asdfkj diuosdf lknv dslf sdj kjd sdfjsdhf sdjfkh sdoweiruo,xzvcz nxzvopwer',
            writeDate: new Date('10/22/2023'),
            readTime: 5
        }, {
            title: 'One last dummy title',
            description: 'last long long dummy description for a this card, lululu lalala qwerty watermelon',
            writeDate: new Date('10/22/2023'),
            readTime: 5
        }

    ]



export interface AssestType {
    name: string;
    url: string;
    backgroundUrl?: string;
    crtVignetting?: number,
    crtVignettingBlur?: number,
    crtVignettingAlpha?: number

}
export const assets: AssestType[] = [
    {
        name: 'video1',
        url: 'https://le4onardo.github.io/backgrounds/Car_floating_ocean.mp4',
        backgroundUrl: 'https://iili.io/2pmKSa9.png',
        crtVignetting: 0.49,
        crtVignettingBlur: 0.15,
        crtVignettingAlpha: 0.61

    }, {
        name: 'video2',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/4K+Snow+Overlay+Free+Download+_+Snow+Falling+Overlay+Free+Download+_++%23Snow+++%23Overlays+++%23Snowoverlays+1080.mp4',
        backgroundUrl: 'https://iili.io/2ppCsTX.png',
        crtVignetting: 0.47,
        crtVignettingBlur: 0.1,
        crtVignettingAlpha: 0.65

    }, {
        name: 'video4',
        url: 'https://le4onardo.github.io/backgrounds/Night_Sky_on_Mars.mp4',
        backgroundUrl: '',
        crtVignetting: 0.46,
        crtVignettingBlur: 0.23,
        crtVignettingAlpha: 1

    }, {
        name: 'video7',
        url: 'https://le4onardo.github.io/backgrounds/Galaxy.mp4',
        backgroundUrl: '',
        crtVignetting: 0.5,
        crtVignettingBlur: 0.1,
        crtVignettingAlpha: 0.91
    }, {
        name: 'video10',
        url: 'https://le4onardo.github.io/backgrounds/Moonlight_retro_wave.mp4',
        backgroundUrl: 'https://iili.io/2pbdIp4.png',

        crtVignetting: 0.55,
        crtVignettingBlur: 0.2,
        crtVignettingAlpha: 0.65

    }, {
        name: 'video11',
        url: 'https://le4onardo.github.io/backgrounds/Nebula_Motion.mp4',
        backgroundUrl: '',
        crtVignetting: 0.7,
        crtVignettingBlur: 0.1,
        crtVignettingAlpha: 0.71

    },
    {
        name: 'video21',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.mp4',
        backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
        crtVignetting: 0.5,
        crtVignettingBlur: 0.25,
        crtVignettingAlpha: 1
    },
    {
        name: 'video1',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/4k+Light+Rays+object+Twist+Motion+Background+2160p+Animation+1080.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    }, {
        name: 'video2',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/4K+Snow+Overlay+Free+Download+_+Snow+Falling+Overlay+Free+Download+_++%23Snow+++%23Overlays+++%23Snowoverlays+1080.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    }, {
        name: 'video3',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Chill+robot+%5BColl+Down+OST%5D.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video4',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Circular_clouds_and_moon.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video5',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/cozy+bedroom+rainy+city+4k+live+wallpaper+1080.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video5',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video6',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+live+Wallpaper+1080p+1080.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video7',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/CYBERPUNK+2077-+MAX+SETTINGS+4K+60FPS+ULTRA.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video8',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Galaxy+_+Free+Motion+Graphics+Background+_+Free+Background+1080.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video9',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/lofi+cozy+house+rainy+night++4k+live+wallpaper+1080.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video10',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/man+sitting+on+car+in+the+ocean.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video11',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Moonlight+Retro+Wave+4K+Live+Wallpaper+_+Xanh+Share+%E2%99%A5+1080.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video12',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Night_Sky_on_Mars.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video13',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/y2mate+com+++Anime+Purple+Evening+Sky+4K+Short+Screensaver+Live+Wallpaper+Relaxing+Background+Window+1080.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video14',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/HD+Black+hole.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    }, {
        name: 'video15',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Lofi+Rainy+Night+Beats+for+Late-Night+Studying+3+AM+Study+Session.mov',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    }, {
        name: 'video16',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Lofi+Rainy+Night+Coding+Session+Focused+Programming+Beats+at+3+AM.mov',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video17',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Glasshouse+Study+Room+with+Forest+view+and+Large+Windows+-+Rain+Sounds+for+Focus+and+Relaxation.mov',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video18',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Glasshouse+Study+Room+with+Forest+view+and+Large+Windows+-+Rain+Sounds+for+Focus+and+Relaxation.mov',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    }, {
        name: 'video18',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Topographic+Textures+_+After+Effects+_+Topographic+Design+_+Topographic+Map++_+Background+hd+1080.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video19',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Neon+Lines+Screensaver+in+4K+%7C+Mesmerizing+Moving+Neon+Lines.mov',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video20',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Digital+White+Lines+Moving+%7C+4K+Relaxing+Screensaver.mov',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video21',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Fireflies+2024+%7C%7C+Wallpaper+Animation+-+Best+Motion+Background+for+Edits.mov',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
    {
        name: 'video22',
        url: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Visual+design+sample18.mp4',
        // backgroundUrl: 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/Cyberpunk+2077+Night+City+4K+animated+wallpaper+1080.webp',
    },
];
