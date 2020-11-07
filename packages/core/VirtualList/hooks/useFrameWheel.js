

export default function useFrameWheel(syncScroll){

    function onWheel(e){

        e.preventDefault();

        syncScroll(e.deltaY);

    };

    return [onWheel];
}