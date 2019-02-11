import { EventEmitter } from 'events'; 

class DragService {
    public eventEmitter:EventEmitter;
    private _disX: any;
    private _disY: any;
    private _mouseDownX: any;
    private _mouseDownY: any;
    private _mouseDownW: any;
    private _mouseDownH: any;

    constructor(
        public eventName: string,
        public rightLimit: number,
        public componentRef: any
    ) { 
        this.eventEmitter = new EventEmitter();
    }

    /**
     * 鼠标下落
     */
    public mouseDown = (e: any) => {
        // event兼容    
        const event: any = e || window.event;
        // 获取鼠标按下的地方距离元素左侧和上侧的距离
        this._disX = event.clientX - this.componentRef.current.offsetLeft;
        this._disY = event.clientY - this.componentRef.current.offsetTop;
        // mousedown时候 获取此时鼠标距离视口左上角的x轴及y轴距离
        this._mouseDownX = event.clientX;
        this._mouseDownY = event.clientY;
        // mousedown时候 获取此时元素的宽高
        this._mouseDownW = this.componentRef.current.offsetWidth;
        this._mouseDownH = this.componentRef.current.offsetHeight;

        document.onmousemove = (ev: any) => {
            this.mouseMove(ev, this.eventName, {
                disX: this._disX,
                disY: this._disY,
                mouseDownX: this._mouseDownX,
                mouseDownY: this._mouseDownY,
                mouseDownW: this._mouseDownW,
                mouseDownH: this._mouseDownH,
                rightLimit: this.rightLimit,
                componentRef: this.componentRef
            });
        };
        document.onmouseup = this.mouseUp;
    }

    /**
     * 鼠标下落后移动MouseEventInit
     */
    public mouseMove = (e: MouseEvent, eventName: string, params: any) => {
        // event兼容    
        const event: any = e || window.event;
        const maxLeft: number = document.body.clientWidth - params.rightLimit;
        const result: any = {
            top: event.clientY - params.disY > 0 ? event.clientY - params.disY : 0,
        };

        if (document.body.clientWidth - params.componentRef.current.offsetLeft - params.rightLimit >= 0)
            result.left = event.clientX - params.disX > 0 ? event.clientX - params.disX > maxLeft ? maxLeft : event.clientX - params.disX  : 0;

        this.eventEmitter.emit(eventName, result);
    }

    /**
     * 鼠标松开
     */
    public mouseUp = (e: MouseEvent) => {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

export {
    DragService
}