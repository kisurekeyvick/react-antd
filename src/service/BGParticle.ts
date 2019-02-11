/**
 * 注释：此处是我借鉴github上其他的项目
 */

import {TweenLite,Circ} from "gsap";

class BGParticle {
    public id: string;
    public width: number;
    public height: number;
    public points: any[];
    public target: any;
    public canvas: any;
    public ctx: any;
    public requestAnimationFrame: any;
    public cancelAnimationFrame: any;
    public myReq: any;

    constructor(id: string) {
        this.id = id;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.points = [];
        this.target = {
            x: 0,
            y: 0
        };
        this.canvas = null;
        this.ctx = null;
        this.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        this.cancelAnimationFrame = window.cancelAnimationFrame;
    }

    public createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.display = 'block';
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        
        const target = document.querySelector(this.id as string);
        if (target) {
            target.appendChild(this.canvas);
        }
    }

    public createPoints() {
        const {width, height} = this;

        for (let x = 0; x < width; x = x + width / 20) {
            for (let y = 0; y < height; y = y + height / 20) {
                const px = x + Math.random() * width / 20;
                const py = y + Math.random() * height / 20;
                const p = {x: px, originX: px, y: py, originY: py};
                this.points.push(p);
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            const closest = [];
            const p1 = this.points[i];

            for (let j = i + 1; j < this.points.length; j++) {
                const p2 = this.points[j]
                let placed = false;
                for (let k = 0; k < 5; k++) {
                    if (!placed) {
                        if (closest[k] === undefined) {
                            closest[k] = p2;
                            placed = true;
                        }
                    }
                }

                for (let k = 0; k < 5; k++) {
                    if (!placed) {
                        if (this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                            closest[k] = p2;
                            placed = true;
                        }
                    }
                }
            }

            p1.closest = closest;
            p1.radius = 2 + Math.random() * 2;

            this.shakePoint(p1);
        }
    }

    public shakePoint(point: any) {
        TweenLite.to(point, 1 + 1 * Math.random(), {
            x: point.originX - 50 + Math.random() * 100,
            y: point.originY - 50 + Math.random() * 100, ease: Circ.easeInOut,
            onComplete: () => {
                this.shakePoint(point);
            }
        });
    }

    public drawPoint(point: any, ctx: any) {
        if (!point.pointActive) return;

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(156,217,249,' + point.pointActive + ')';
        ctx.fill();
    }

    public drawLines(point: any, ctx: any) {
        if (!point.lineActive) return;
        for (const item of point.closest) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(item.x, item.y);
            ctx.strokeStyle = 'rgba(156,217,249,' + point.lineActive + ')';
            ctx.stroke();
        }
    }

    public getDistance(p1: any, p2: any) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    public handleResize(e?: any) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    public handleMouseMove(e: MouseEvent) {
        let posx = 0; 
        let posy = 0;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }

        else if (e.clientX || e.clientY) {
            posx = e.clientX + (document.body && document.body.scrollLeft || 0) + (document.documentElement && document.documentElement.scrollLeft || 0);
            posy = e.clientY + ( document.body && document.body.scrollTop || 0 ) + ( document.documentElement && document.documentElement.scrollTop || 0);
        }

        this.target.x = posx; 
        this.target.y = posy;
    }

    public init() {
        this.createCanvas();
        this.createPoints();
        this.start();

        window.onresize = (e) => this.handleResize(e);
        window.onmousemove = (e) => this.handleMouseMove(e);
    }

    public start() {
        const {width, height, getDistance, points, ctx, target, requestAnimationFrame} = this
        this.ctx.clearRect(0, 0, width, height);

        for (const point of points) {
            if (Math.abs(getDistance(target, point)) < 4000) {
                point.lineActive = 0.3;
                point.pointActive = 0.6;
            } else if (Math.abs(getDistance(target, point)) < 20000) {
                point.lineActive = 0.1;
                point.pointActive = 0.3;
            } else if (Math.abs(getDistance(target, point)) < 40000) {
                point.lineActive = 0.02;
                point.pointActive = 0.1;
            } else {
                point.lineActive = 0;
                point.pointActive = 0;
            }

            this.drawLines(point, ctx);
            this.drawPoint(point, ctx);
        }

        this.myReq = requestAnimationFrame(() => this.start());
    }

    public destory() {
        const cancelAnimationFrame = this.cancelAnimationFrame;
        cancelAnimationFrame(this.myReq);
        window.onresize = null;
        window.onmousemove = null;
    }
}

export default BGParticle;
