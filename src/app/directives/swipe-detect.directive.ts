import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Directive({
  selector: '[swipeDetect]',
})
export class SwipeDetectDirective {
  defaultTouch = { x: 0, y: 0, time: 0 };

    @HostListener('touchstart', ['$event'])
    //@HostListener('touchmove', ['$event'])
    @HostListener('touchend', ['$event'])
    @HostListener('touchcancel', ['$event'])
    handleTouch(event: any) {
        let touch = event.touches[0] || event.changedTouches[0];

        // check the events
        if (event.type === 'touchstart') {
            this.defaultTouch.x = touch.pageX;
            this.defaultTouch.y = touch.pageY;
            this.defaultTouch.time = event.timeStamp;
        } else if (event.type === 'touchend') {
            let deltaX = touch.pageX - this.defaultTouch.x;
            let deltaY = touch.pageY - this.defaultTouch.y;
            let deltaTime = event.timeStamp - this.defaultTouch.time;

            // simulte a swipe -> less than 500 ms and more than 60 px
            if (deltaTime < 500) {
                // touch movement lasted less than 500 ms
                if (Math.abs(deltaX) > 60) {
                    // delta x is at least 60 pixels
                    if (deltaX > 0) {
                        this.doSwipeRight(event);
                    } else {
                        this.doSwipeLeft(event);
                    }
                }

                if (Math.abs(deltaY) > 60) {
                    // delta y is at least 60 pixels
                    if (deltaY > 0) {
                        this.doSwipeDown(event);
                    } else {
                        this.doSwipeUp(event);
                    }
                }
            }
        }
    }

    doSwipeLeft(event: any) {
        console.log('swipe left', event);
        alert('left');
    }

    doSwipeRight(event: any) {
        console.log('swipe right', event);
        alert('right');
    }

    doSwipeUp(event: any) {
        console.log('swipe up', event);
    }

    doSwipeDown(event: any) {
        console.log('swipe down', event);
    }
}
