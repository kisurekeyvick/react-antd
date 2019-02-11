import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Icon, Popover, Slider, Tooltip, Row } from 'antd';
import './audio-component.scss';

interface ItemInfo {
    name: string;
    url: string;
    id: number;
    [key: string]: any
}

class AudioComponent extends React.PureComponent<any, any>{
    static propTypes = {
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }

    public audioDom: any;
    public audioRef: any;
    public audioProgressRef: any;

    constructor(public props: any) {
        super(props);

        /**
         * run          是否播放
         * playStatus   是否单曲循环 'single'单曲循环  'cycle' 循环播放
         * speed        音频播放速度
         * totalTime    音频的总时间
         * currentTime  音频当前播放点
         */
        this.state = {
            run: false,
            playStatus: 'single',
            speed: 1,
            totalTime: '00:00',
            currentTime: '00:00',
            audioStyle: {
                audioProgreesPast: { width: '0%' },
                audioAudioOrigin: { left: '0%' },
                audioSoundCurrent: { height: '50%' },
                audioSoundPoint: { bottom: '50%' }
            },
        };

        this.audioRef = React.createRef();
        this.audioProgressRef = React.createRef();
    }

    public componentDidMount() {
        this.audioDom = this.audioRef.current;

        this.timeUpdateEventListener();
        this.audioProgressDragEventListener();
    }

    /**
     * 进度条播放进度条修改
     */
    public timeUpdateEventListener = () => {
        this.audioDom.addEventListener('timeupdate', () => {
            const currentTime = this.calcTime(this.audioDom.currentTime);
            const percent = `${(this.audioDom.currentTime / this.audioDom.duration) * 100}%`;

            this.setState({
                currentTime,
                audioStyle: {...this.state.audioStyle, ...{
                    audioProgreesPast: { width: percent },
                    audioAudioOrigin: { left: percent }
                }}
            });
        });
    }

    /**
     * 音量控制
     */
    public soundControlEventListener = (e: any) => {
        const height = e.currentTarget.offsetHeight;
        const location = e.nativeEvent.offsetY;

        let volume = (height - location) / height;
        if (volume <= 0) volume = 0;
        if (volume >= 1) volume = 1;

        this.audioDom.volume = volume;
        const value = `${100 * volume}%`;
        this.audioDom.muted = volume === 0 ? true : false;

        this.setState({
            audioStyle: {...this.state.audioStyle, ...{
                audioSoundCurrent: { height: value },
                audioSoundPoint: { bottom: value }
            }}
        });
    }

    /**
     * 进度条拖拽快进
     */
    public audioProgressDragEventListener = () => {
        const dom = this.audioProgressRef.current;

        dom.addEventListener('click', (res: MouseEvent) => {
            const left = dom.getBoundingClientRect().left;
            const width = dom.offsetWidth;
            const progressX = Math.min(width, Math.abs(res.clientX - left));
            if (this.audioDom.currentTime && this.audioDom.duration) {
                this.audioDom.currentTime = +(+(progressX / width)) * (this.audioDom.duration);
                this.audioDom.play();
            }
        });
    }

    /**
     * 音频 播放/暂停
     */
    public run = (e: any) => {
        e.stopPropagation();

        const run: boolean = !this.state.run;
        const totalTime: string = this.state.totalTime === '00:00' ? this.calcTime(this.audioDom.duration) : this.state.totalTime;

        if(run)
            this.audioDom.play();
        else if (!run)
            this.audioDom.pause();

        this.setState({
            run,
            totalTime
        });
    }

    /**
     * 计算音频时间
     */
    public calcTime = (time: number): string => {
        let hour: string; 
        let minute: string; 
        let second: string; 
        let timer: string = '';

        hour = String(parseInt((time / 3600).toString(), 10));
        minute = String(parseInt(((time % 3600) / 60).toString() , 10));
        second = String(parseInt((time % 60).toString(), 10));

        if (hour !== '0') {
            if (hour.length === 1) hour = '0' + hour;
            timer += (hour + ':');
        }

        if (minute.length === 1) minute = '0' + minute;
            timer += (minute + ':');

        if (second.length === 1) second = '0' + second;
            timer += second;

        return timer;
    }

    /**
     * 切换播放状态
     */
    public changePlayStatus = (e: Event, status: string) => {
        e.stopPropagation();

        this.audioDom.loop = status === 'cycle';

        this.setState({
            playStatus: status
        });
    }

    /**
     * 播放选项(组件)： 单次播放、循环播放
     */
    public PlayStatusContent = <div className='audio-status-menu'>
        <a href="javascript:;" onClick={(e: any) => this.changePlayStatus(e, 'single')}><Icon type="swap-right" />单次播放</a>
        <a href="javascript:;" onClick={(e: any) => this.changePlayStatus(e, 'cycle')}><Icon type="retweet" />循环播放</a>
    </div>

    /**
     * 播放速度(组件)
     */
    public PlaySpeedContent = () => {
        const marks = {
            0: '减慢',
            50: '正常',
            100: '加快'
        };

        const onChange = (value: number) => {
            let speed: number = 1;
            
            if (value !== 50)
                speed = +((value / 100).toFixed(1)) + 0.5;

            this.setState({
                speed
            });

            this.audioDom.playbackRate = speed;
        };

        return <div className='audio-speed-slide'>
                    <p>{this.state.speed === 1 ? '' : this.state.speed}倍数播放</p>
                    <Slider marks={marks} tipFormatter={null} defaultValue={50} onChange={onChange}/>
                </div>
    }

    /**
     * 声控组件
     */
    public SoundContent = () => {
        return  <div className='audio-operation-sound'>
                    <div className="audio-sound-progress" onClick={this.soundControlEventListener}>
                        <span className="audio-sound-current" style={this.state.audioStyle.audioSoundCurrent} />
                        <span className="audio-sound-point" style={this.state.audioStyle.audioSoundPoint} />
                        <span className="volume-event" />
                    </div>
                </div>
    }

    public render() {
        return (
            <div className='audio-box'>
                <audio key={this.props.id} src={this.props.url} className='native-audio' ref={this.audioRef}/>
                <Row>
                    <div className='audio-detail'>
                        <div className='audio-detail-item play-box'>
                            <a href="javascript:;" onClick={this.run}>
                                {
                                    this.state.run ?
                                    <Icon type="pause-circle" />:
                                    <Icon type="play-circle" />
                                }
                            </a>
                        </div>
                        <div className='audio-detail-item pathway-box'>
                            <div>
                                <p>客户-{this.props.name}</p>
                            </div>
                            <div className="audio-progress">
                                <div className="audio-progrees-detail" ref={this.audioProgressRef}>
                                    <span className="audio-progrees-past" style={this.state.audioStyle.audioProgreesPast} />
                                    <span className="audio-progrees-all" style={{width: '100%'}} />
                                </div>
                                <div className="audio-audio-origin" style={this.state.audioStyle.audioAudioOrigin} />
                            </div>
                        </div>
                        <div className='audio-detail-item speed-box'>
                            <div>
                                <Popover content={this.PlaySpeedContent()} trigger="click">
                                    <span className='audio-speed-button'>
                                        倍速<Icon type="caret-up" />
                                    </span>
                                </Popover>
                            </div>
                            <div>
                                <p>{this.state.currentTime}/{this.state.totalTime}</p>
                            </div>
                        </div>
                        <div className='audio-detail-item audio-operation'>  
                            <Popover content={this.PlayStatusContent} trigger="click">
                                <span className='audio-operation-playStatus'>
                                    {
                                        this.state.playStatus === 'single' ?
                                        <Tooltip placement="bottom" title="单次播放">
                                            <Icon type="swap-right" />
                                        </Tooltip> :
                                        this.state.playStatus === 'cycle' ?
                                        <Tooltip placement="bottom" title="循环播放">
                                            <Icon type="retweet" />
                                        </Tooltip> :
                                        null
                                    }
                                </span>
                            </Popover>

                            <span className='audio-operation-sound'>
                                <Popover content={this.SoundContent()} trigger="click" >
                                    <a className="audio-operation-sound-icon" href="javascript:;"><Icon type="sound" /></a>
                                </Popover>
                            </span>
                        </div>
                    </div>
                </Row>
            </div>
        )
    }
}

export {
    ItemInfo,
    AudioComponent
}

/**
 * 在constructor中预先添加 this.audioRef = React.createRef(); 才能获取到真实的dom
 * 如果 this.audioRef = React.createRef(); 放在componentDidMount中，就获取不到真实的dom
 * 
 * 猜测原因：componentDidMount代表的是组件挂载完成的，所以如果想获取到ref,需要在完成挂载前进行ref的挂载
 */