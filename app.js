/* class ValInput {
    constructor(value, ) {

    }
} */

class ColStr {
    constructor(type, val1, val2, val3) {
        this.type = type;
        this.val1 = val1;
        this.val2 = val2;
        this.val3 = val3;
        if (this.type != 'rgb') {
            this.fullStr = String(this.type + '(' + this.val1 + ', ' + this.val2 + '%, ' + this.val3 + '%)');
        } else {
            this.fullStr = String(this.type + '(' + this.val1 + ', ' + this.val2 + ', ' + this.val3 + ')');
        }
    }

    convHwbToRgb() {
        let h = this.val1;
        let w = this.val2;
        let ba = this.val3;

        let r;
        let g;
        let bu;

        let R;
        let G;
        let B;

        const C = 1
        const H = h/60;
        const X = 1 - Math.abs((H % 2) - 1)

        w /= 100;
        ba /= 100;

        if (w + ba >= 100) {
            r, g, bu = w/(w + ba);
        } else {
            if (H >= 0 && H < 1) {
                R = C;
                G = X;
                B = 0;
            } else if (H >= 1 && H < 2) {
                R = X;
                G = C;
                B = 0;
            } else if (H >= 2 && H < 3) {
                R = 0;
                G = C;
                B = X;
            } else if (H >= 3 && H < 4) {
                R = 0;
                G = X;
                B = C;
            } else if (H >= 4 && H < 5) {
                R = X;
                G = 0;
                B = C;
            } else if (H >= 5 && H < 6) {
                R = C;
                G = 0;
                B = X;
            } else {
                console.log('Hue is out of range');
            }
            
            r = R * (1 - w - ba) + w;
            g = G * (1 - w - ba) + w;
            bu = B * (1 - w - ba) + w;

            r = Math.round(r * 255);
            g = Math.round(g * 255);
            bu = Math.round(bu * 255);

            this.val1 = r;
            this.val2 = g;
            this.val3 = bu;

            this.type = 'rgb';
            this.fullStr = String(this.type + '(' + this.val1 + ', ' + this.val2 + ', ' + this.val3 + ')');
        }
    }

    convHslToRgb() {
        let h = this.val1;
        let s = this.val2;
        let l = this.val3;

        let r;
        let g;
        let b;
        //capitals here act as primes in the og notation in maths
        let R;
        let G;
        let B;

        s /= 100;
        l /= 100;

        const C = (1 - Math.abs((2 * l) - 1)) * s;
        const H = h/60;
        const X = C * (1 - Math.abs((H % 2) - 1))
        const m = l - C/2;

        if (H >= 0 && H < 1) {
            R = C;
            G = X;
            B = 0;
        } else if (H >= 1 && H < 2) {
            R = X;
            G = C;
            B = 0;
        } else if (H >= 2 && H < 3) {
            R = 0;
            G = C;
            B = X;
        } else if (H >= 3 && H < 4) {
            R = 0;
            G = X;
            B = C;
        } else if (H >= 4 && H < 5) {
            R = X;
            G = 0;
            B = C;
        } else if (H >= 5 && H < 6) {
            R = C;
            G = 0;
            B = X;
        } else {
            console.log('Hue is out of range');
        }

        r = Math.round(255 * (R + m));
        g = Math.round(255 * (G + m));
        b = Math.round(255 * (B + m));

        this.val1 = r;
        this.val2 = g;
        this.val3 = b;

        this.type = 'rgb';
        this.fullStr = String(this.type + '(' + this.val1 + ', ' + this.val2 + ', ' + this.val3 + ')');
    }

    convHexToRgb() {
        
    }

    convRgbToHwb() {
        let r = this.val1;
        let g = this.val2;
        let b = this.val3;

        let H;
        let W;
        let B;
        //B here is blackwhile b is blue

        r /= 255;
        g /= 255;
        b /= 255;

        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);

        W = Math.round(100 * min);
        B = Math.round(100 * (1 - max));

        if (max == min) {
            H = 0;
        } else {
            if (max == r) {
                H = (g - b)/(max - min);
            } else if (max == g) {
                H = 2 + (b - r)/(max - min);
            } else if (max == b) {
                H = 4 + (r - g)/(max - min);
            } else {
                console.log('ERROR, none are the max');
            }
    
            H = Math.round(H * 60);
    
            if (H < 0) {
                H += 360;
            }
        }

        this.val1 = H;
        this.val2 = W;
        this.val3 = B;

        this.type = 'hwb';
        this.fullStr = String(this.type + '(' + this.val1 + ', ' + this.val2 + '%, ' + this.val3 + '%)');
    
    }

    convRgbToHsl() {
        let r = this.val1;
        let g = this.val2;
        let b = this.val3;

        let h;
        let s;
        let l;

        r /= 255;
        g /= 255;
        b /= 255;

        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);

        l = Math.round((min + max)/2 * 100);

        if(min == max) {
            s = 0;
            h = 0;
        } else {
            if (l <= 50) {
                s = Math.round((max - min)/(max + min) * 100);
            }
            if (l > 50) {
                s = Math.round((max - min)/(2 - max - min) * 100);
            }

            if (max == r) {
                h = (g - b)/(max - min);
            } else if (max == g) {
                h = 2 + (b - r)/(max - min);
            } else if (max == b) {
                h = 4 + (r - g)/(max - min);
            } else {
                console.log('ERROR, none are the max');
            }

            h = Math.round(h * 60);

            if (h < 0) {
                h += 360;
            }
        }

        this.val1 = h;
        this.val2 = s;
        this.val3 = l;

        this.type = 'hsl';
        this.fullStr = String(this.type + '(' + this.val1 + ', ' + this.val2 + '%, ' + this.val3 + '%)');
    }

    convRgbToHex() {

    }
}

const enterBtn = document.getElementById('enter-val');

var colStrTy = 'rgb';

const redV = Math.floor(Math.random() * 255);
const greenV = Math.floor(Math.random() * 255);
const blueV = Math.floor(Math.random() * 255);

const rgbV = String('rgb(' + redV + ', ' + greenV + ', ' + blueV + ')');

console.log('og rgb val: ' + rgbV);

document.documentElement.style.setProperty('--Mr', redV);
document.documentElement.style.setProperty('--Mg', greenV);
document.documentElement.style.setProperty('--Mb', blueV);


enterBtn.addEventListener('click', () => {
    const testRgb = new ColStr('rgb', redV, greenV, blueV);

    console.log('conv rgb to hsl test');
    testRgb.convRgbToHsl();
    console.log(testRgb.fullStr);

    console.log('conv hsl to rgb test');
    testRgb.convHslToRgb();
    console.log(testRgb.fullStr);

    console.log('conv rgb to hwb test');
    testRgb.convRgbToHwb();
    console.log(testRgb.fullStr);

    console.log('conv hwb to rgb test');
    testRgb.convHwbToRgb();
    console.log(testRgb.fullStr)
});
