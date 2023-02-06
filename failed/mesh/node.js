function Node(x, y) {
    this.x = x;
    this.y = y;

    this.getDistance = function(otherNode) {
        return Math.sqrt(Math.pow(this.x - otherNode.x, 2) + Math.pow(this.y - otherNode.y, 2));
    }
}