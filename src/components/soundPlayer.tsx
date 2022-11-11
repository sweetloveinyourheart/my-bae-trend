import { FunctionComponent, useRef, useState } from "react";
import TimeSlider from "react-input-slider";
import { BiPlayCircle, BiPauseCircle, BiSkipPreviousCircle, BiSkipNextCircle, BiVolumeFull } from 'react-icons/bi'

interface SoundPlayerProps {
    active: boolean
}

const SoundPlayer: FunctionComponent<SoundPlayerProps> = ({ active }) => {
    const audioRef = useRef<any>();
    const [audioIndex, setAudioIndex] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isPlay, setPlay] = useState<boolean>(false);

    const [songs, setSongs] = useState([
        { src: '/sound/Chayvekhocvoianh.mp3', name: 'Chay về khóc với anh', singer: 'Erik' },
        { src: '/sound/NgayDauTien.mp3', name: 'Ngày đầu tiên', singer: 'Đức Phúc' },
        { src: '/sound/Noinaycoanh.wav', name: 'Nơi này có anh', singer: 'Sơn Tùng MTP' },
        { src: '/sound/Daydream.mp3', name: 'Day Dream', singer: 'Soobin Hoàng Sơn' },
    ])

    const handleLoadedData = () => {
        setDuration(audioRef.current.duration);
        if (isPlay) audioRef.current.play();
    };

    const handlePausePlayClick = () => {
        (isPlay)
            ? audioRef.current.pause()
            : audioRef.current.play()

        setPlay(!isPlay);
    };

    const handleTimeSliderChange = ({ x }: { x: number, y: number }) => {
        audioRef.current.currentTime = x;
        setCurrentTime(x);

        if (!isPlay) {
            setPlay(true);
            audioRef.current.play();
        }
    };

    const onSelectMusic = (index: number) => setAudioIndex(index)

    const renderSongs = () => {
        return songs.map((value, index) => {
            return (
                <div
                    className={`song` + (audioIndex === index ? ' song--active' : '')}
                    onClick={() => onSelectMusic(index)}
                >
                    <div className="song__index">
                        {audioIndex === index
                            ? (<BiVolumeFull />)
                            : (<span>{index + 1}.</span>)
                        }
                    </div>
                    <div className="song__name">
                        {value.name}
                    </div>
                    <div className="song__singer">
                        {value.singer}
                    </div>
                </div>
            )
        })
    }

    return (
        <div
            className="sound-player"
            style={{
                display: active ? 'block' : 'none'
            }}

        >
            <div className="player-area">
                {/* Playlist  */}
                <div className="playlist">
                    <div className="playlist__title">
                        <div className="song__index"># </div>
                        <div className="song__name"> Tên bài hát</div>
                        <div className="song__singer"> Ca sĩ </div>
                    </div>
                    {renderSongs()}
                </div>

                {/* Player */}
                <div className="player">
                    {/* <h1> Sound Player </h1> */}
                    <div className="control-group">
                        <div
                            className="control-group__btn"
                            onClick={() => setAudioIndex((audioIndex - 1) % songs.length)}
                        >
                            <BiSkipPreviousCircle />
                        </div>
                        <div className="control-group__btn--main" onClick={handlePausePlayClick}>
                            {isPlay ? <BiPauseCircle /> : <BiPlayCircle />}
                        </div>
                        <div
                            className="control-group__btn"
                            onClick={() => setAudioIndex((audioIndex + 1) % songs.length)}
                        >
                            <BiSkipNextCircle />
                        </div>
                    </div>
                    <TimeSlider
                        axis="x"
                        xmax={duration}
                        x={currentTime}
                        onChange={handleTimeSliderChange}
                        styles={{
                            track: {
                                backgroundColor: "#e3e3e3",
                                height: "4px",
                                width: '300px'
                            },
                            active: {
                                background: `linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)`,
                                height: "4px",
                            },
                            thumb: {
                                marginTop: "-2px",
                                width: "12px",
                                height: "12px",
                                backgroundColor: "#e21873",
                                borderRadius: 10,

                            },
                        }}
                    />
                    <audio
                        ref={audioRef}
                        src={songs[audioIndex].src}
                        onLoadedData={handleLoadedData}
                        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                        onEnded={() => setPlay(false)}
                    />
                </div>
            </div>
        </div >
    );
}

export default SoundPlayer;