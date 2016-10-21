function addImage(canvas, imageUrl, x1, y1, x2, y2, x3, y3, x4, y4) {        
        
        var img = new Image();

       /** Solves a system of linear equations.
        
        t1 = (a * r1) + (b + s1) + c
        t2 = (a * r2) + (b + s2) + c
        t3 = (a * r3) + (b + s3) + c
        
        r1 - t3 are the known values.
        a, b, c are the unknowns to be solved.
        returns the a, b, c coefficients.
        */
        function linearSolution(r1, s1, t1, r2, s2, t2, r3, s3, t3)
        {
            // make them all floats
            r1 = parseFloat(r1);
            s1 = parseFloat(s1);
            t1 = parseFloat(t1);
            r2 = parseFloat(r2);
            s2 = parseFloat(s2);
            t2 = parseFloat(t2);
            r3 = parseFloat(r3);
            s3 = parseFloat(s3);
            t3 = parseFloat(t3);
            
            var a = (((t2 - t3) * (s1 - s2)) - ((t1 - t2) * (s2 - s3))) / (((r2 - r3) * (s1 - s2)) - ((r1 - r2) * (s2 - s3)));
            var b = (((t2 - t3) * (r1 - r2)) - ((t1 - t2) * (r2 - r3))) / (((s2 - s3) * (r1 - r2)) - ((s1 - s2) * (r2 - r3)));
            var c = t1 - (r1 * a) - (s1 * b);
            
            return [a, b, c];
        }
        
        img.onload = function()
        {
            var c = canvas.getContext('2d');
            var w = canvas.width;
            var h = canvas.height;
            
            xm = linearSolution(0, 0, x1, this.width, 0, x2, 0, this.height, x3);
            ym = linearSolution(0, 0, y1, this.width, 0, y2, 0, this.height, y3);

            xn = linearSolution(this.width, this.height, x4, this.width, 0, x2, 0, this.height, x3);
            yn = linearSolution(this.width, this.height, y4, this.width, 0, y2, 0, this.height, y3);
            
            c.save();
            // another matrix argument order bug?
            c.setTransform(xm[0], ym[0], xm[1], ym[1], xm[2], ym[2]);
            c.beginPath();
            c.moveTo(0, 0);
            c.lineTo(this.width, 0);
            c.lineTo(0, this.height);
            c.lineTo(0, 0);
            c.closePath();
            c.fill();
            c.clip();
            c.drawImage(this, 0, 0, this.width, this.height);
            c.restore();
            
            c.save();
            // another matrix argument order bug?
            c.setTransform(xn[0], yn[0], xn[1], yn[1], xn[2], yn[2]);
            c.beginPath();
            c.moveTo(this.width, this.height);
            c.lineTo(this.width, 0);
            c.lineTo(0, this.height);
            c.lineTo(this.width, this.height);
            c.closePath();
            c.fill();
            c.clip();
            c.drawImage(this, 0, 0, this.width, this.height);
            c.restore();
        };

        img.src = imageUrl;
}