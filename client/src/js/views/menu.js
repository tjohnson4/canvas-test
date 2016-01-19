(function(window) {
    // Inheritance Helpers -------------------------------------
    // Here's where the inheritance occurs 
    Menu.prototype = new DispatchableObject();
    
    // Update the constructor to point to the subclass
    Menu.prototype.constructor = Menu;

    // index of selected menu item
    Menu.prototype._index = 0;
    // is men in focus
    Menu.prototype._focus = false;
    Menu.prototype._context = undefined;
    Menu.prototype._canvas = undefined;
    Menu.prototype._items = [];
    Menu.prototype._margin = 5;
    /**
     * This class handles the mapping of the device keycodes
     * with the navigation events expected by the application
     *
     * @class Menu
     * @extends DispatchableObject
     * @constructor
     */
    function Menu(canvas, color, items) {
        if (canvas instanceof HTMLCanvasElement) {
            Menu.prototype._canvas = canvas;
        }

        Menu.prototype._context = canvas.getContext("2d");
        Menu.prototype._context.fillStyle = color;
        Menu.prototype._context.fillRect(0, 0, screen.width, 40);
        Menu.prototype._context.shadowBlur = 20;
        Menu.prototype._context.shadowFill = "black";

        var x = 0; 
        for (var i = 0, len = items.length; i < len; i++) {
            var item = new MenuItem(canvas, items[i].label, items[i].action, "#9e9e9e", "#e0e0e0");    
            x += item._width + this._margin;
            item.setProp("x", x);
            this._items.push(item);
        }
    }

    Menu.addMenuItem = function () {
        
    } 

    // Scope Helper --------------------------------------------
    window.Menu = Menu;
}(window));
