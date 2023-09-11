export const cardsData: {
    title: string,
    description: string,
    writeDate: Date,
    readTime: number // minutes
}[] = [
        /*
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
            */
    ]



export interface AssestType {
    name: string;
    url: string;
    crtVignetting: number,
    crtVignettingBlur: number,
    crtVignettingAlpha: number

}
export const assets: AssestType[] = [
    {
        name: 'video1',
        url: 'https://le4onardo.github.io/backgrounds/Car_floating_ocean.mp4',
        crtVignetting: 0.49,
        crtVignettingBlur: 0.15,
        crtVignettingAlpha: 0.61

    }, {
        name: 'video2',
        url: 'https://le4onardo.github.io/backgrounds/Circular_clouds_and_moon.mp4',
        crtVignetting: 0.47,
        crtVignettingBlur: 0.1,
        crtVignettingAlpha: 0.65

    }, {
        name: 'video3',
        url: 'https://le4onardo.github.io/backgrounds/Magic_forest.mp4', //not too pretty
        crtVignetting: 0.5,
        crtVignettingBlur: 0.3,
        crtVignettingAlpha: 0.93

    }, {
        name: 'video4',
        url: 'https://le4onardo.github.io/backgrounds/Night_Sky_on_Mars.mp4',
        crtVignetting: 0.46,
        crtVignettingBlur: 0.23,
        crtVignettingAlpha: 1

    }, {
        name: 'video5',
        url: 'https://le4onardo.github.io/backgrounds/Background_Video_Loop.mp4',
        crtVignetting: 0.49,
        crtVignettingBlur: 0.15,
        crtVignettingAlpha: 0.9
    }, {
        name: 'video6',
        url: 'https://le4onardo.github.io/backgrounds/Man_flying_to_sun.mp4',
        crtVignetting: 0.47,
        crtVignettingBlur: 0.2,
        crtVignettingAlpha: 0.81

    }, {
        name: 'video7',
        url: 'https://le4onardo.github.io/backgrounds/Galaxy.mp4',
        crtVignetting: 0.5,
        crtVignettingBlur: 0.1,
        crtVignettingAlpha: 0.91
    }, {
        name: 'video8',
        url: 'https://le4onardo.github.io/backgrounds/Man_walking_highway.mp4', // too short/ starts with delay

        crtVignetting: 0.48,
        crtVignettingBlur: 0.15,
        crtVignettingAlpha: 0.86

    }, {
        name: 'video9',
        url: 'https://le4onardo.github.io/backgrounds/Man_walking_on_water.mp4',

        crtVignetting: 0.46,
        crtVignettingBlur: 0.1,
        crtVignettingAlpha: 0.89

    }, {
        name: 'video10',
        url: 'https://le4onardo.github.io/backgrounds/Moonlight_retro_wave.mp4',

        crtVignetting: 0.55,
        crtVignettingBlur: 0.2,
        crtVignettingAlpha: 0.65

    }, {
        name: 'video11',
        url: 'https://le4onardo.github.io/backgrounds/Nebula_Motion.mp4',

        crtVignetting: 0.4,
        crtVignettingBlur: 0.1,
        crtVignettingAlpha: 0.71

    }, {
        name: 'video12',
        url: 'https://le4onardo.github.io/backgrounds/Floating_blue_crystal.mp4', // not too pretty

        crtVignetting: 0.49,
        crtVignettingBlur: 0.15,
        crtVignettingAlpha: 0.86

    }, {
        name: 'video13',
        url: 'https://le4onardo.github.io/backgrounds/Shattered_monolith.mp4',
        crtVignetting: 0.5,
        crtVignettingBlur: 0.15,
        crtVignettingAlpha: 0.96

    }, {
        name: 'video14',
        url: 'https://le4onardo.github.io/backgrounds/Space_Drive.mp4',
        crtVignetting: 0.48,
        crtVignettingBlur: 0.1,
        crtVignettingAlpha: 0.95

    }, {
        name: 'video15',
        url: 'https://le4onardo.github.io/backgrounds/Spaceman_Walking_Home.mp4',
        crtVignetting: 0.46,
        crtVignettingBlur: 0.2,
        crtVignettingAlpha: 0.94

    }, {
        name: 'video16',
        url: 'https://le4onardo.github.io/backgrounds/Stars_Sky_Constellation.mp4',
        crtVignetting: 0.45,
        crtVignettingBlur: 0.15,
        crtVignettingAlpha: 0.51

    }, {
        name: 'video17',
        url: 'https://le4onardo.github.io/backgrounds/Spaceman_walking_towards_blackhole.mp4', // not too pretty
        crtVignetting: 0.6,
        crtVignettingBlur: 0.2,
        crtVignettingAlpha: 0.91

    }, {
        name: 'video18',
        url: 'https://le4onardo.github.io/backgrounds/spaceman_floating_purple_water.mp4',
        crtVignetting: 0.5,
        crtVignettingBlur: 0.15,
        crtVignettingAlpha: 0.9

    },
    {
        name: 'video19',
        url: 'https://le4onardo.github.io/backgrounds/Moon_in_forest.mp4', // starts with delay
        crtVignetting: 0.48,
        crtVignettingBlur: 0.15,
        crtVignettingAlpha: 0.91

    }, {
        name: 'video20',
        url: 'https://le4onardo.github.io/backgrounds/Spaceman_in_wormhole.mp4', // starts with delay
        crtVignetting: 0.5,
        crtVignettingBlur: 0.2,
        crtVignettingAlpha: 0.96
    }
];
