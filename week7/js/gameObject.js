class gameObject {
    constructor() {
        this.x = c.width / 2;
        this.y = c.height / 2;
        this.angle = 0;
        this.w = 100;
        this.h = 100;
        this.vx = 0;
        this.vy = 0;
        this.color = `blue`;
    }

    // Standard Rectangle
    render() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
    }

    // Sprite Placeholder (Box with an X)
    renderSprite() {
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.beginPath();
        ctx.moveTo(-this.w / 2, -this.h / 2);
        ctx.lineTo(this.w / 2, this.h / 2);
        ctx.moveTo(this.w / 2, -this.h / 2);
        ctx.lineTo(-this.w / 2, this.h / 2);
        ctx.stroke();
        ctx.restore();
    }

    // Semicircle
    renderSemicircle() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.beginPath();
        ctx.arc(0, 0, this.w / 2, 0, Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    move() {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    top() { return this.y - this.h / 2; }
    bottom() { return this.y + this.h / 2; }
    left() { return this.x - this.w / 2; }
    right() { return this.x + this.w / 2; }

    // FIXED: Wrapped the logic in a proper function named 'overlaps'
    overlaps(_obj) {
        if (_obj &&
            this.top() < _obj.bottom() &&
            this.bottom() > _obj.top() &&
            this.left() < _obj.right() &&
            this.right() > _obj.left()
        ) {
            return true;
        }
        return false;
    }
}