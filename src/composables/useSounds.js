import { Howl } from 'howler';

import clickSoundFile from '@/assets/audio/736912__jackosnb__menu_click.mp3';
import keySoundFile from '@/assets/audio/390328__lightnessko__door-unlocking-with-keys.mp3';
import lockSoundFile from '@/assets/audio/lock.mp3';
import resetSoundFile from '@/assets/audio/360329__inspectorj__camera-shutter-fast-a.mp3';
import wooshSoundFile from '@/assets/audio/woosh.mp3';

export function useSounds() {
    const clickSound = new Howl({
        src: [clickSoundFile],
        preload: true
    });

    const keySound = new Howl({
        src: [keySoundFile],
        preload: true
    });

    const lockSound = new Howl({
        src: [lockSoundFile],
        preload: true
    });

    const resetSound = new Howl({
        src: [resetSoundFile],
        preload: true
    });

    const wooshSound = new Howl({
        src: [wooshSoundFile],
        preload: true
    });

    return {
        clickSound,
        keySound,
        lockSound,
        resetSound,
        wooshSound
    };
}