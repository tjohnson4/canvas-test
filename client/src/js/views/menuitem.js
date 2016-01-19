(function(window) {
    // Inheritance Helpers -------------------------------------
    // Here's where the inheritance occurs 
    MenuItem.prototype = new DispatchableObject();
    
    // Update the constructor to point to the subclass
    MenuItem.prototype.constructor = MenuItem;

    MenuItem.prototype._action = undefined;
    MenuItem.prototype._text = undefined;
    // is menu item in focus
    MenuItem.prototype._focusColor = "#9E9E9E";
    // is menu item selected
    MenuItem.prototype._selectedColor = "#E0E0E0";
    MenuItem.prototype._state = "selected"; // state : none, selected, focus
    MenuItem.prototype._context = undefined;
    MenuItem.prototype._canvas = undefined;
    MenuItem.prototype._padding = 20;
    MenuItem.prototype._width = 0; 
    MenuItem.prototype._height = 40;
    MenuItem.prototype._x = 0;
    MenuItem.prototype._font = "30px Arial";
    /**
     * This class handles the mapping of the device keycodes
     * with the navigation events expected by the application
     *
     * @class MenuItem
     * @extends DispatchableObject
     * @constructor
     */
    function MenuItem(canvas, text, action, focus_color, selected_color) {
        if (canvas instanceof HTMLCanvasElement) {
            this._canvas = canvas;
        }

        if (text)
            this._text = text;

        if (action)
            this._action = action;
      
        if (focus_color)
            this._focusColor = focus_color;

        if (selected_color)
            this._selectedColor = selected_color;

        this.draw();

        return this;
    }

    MenuItem.prototype.draw = function() {
        // clear contexts 
        if (this._textContext === undefined)
            this._textContext = canvas.getContext("2d");
        else 
            this._textContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
        
        if (this._bgContext === undefined)
            this._bgContext = canvas.getContext("2d");
        else 
            this._bgContext.clearRect(0, 0, this._canvas.width, this._canvas.height); 
       
        // set background 
        if (this._state !== "none") {
            var color = (this._state === "selected") ? this._selectedColor : this._focusColor;
            this._bgContext.fillStyle = color;
            this._bgContext.fillRect(0, 0, this._width, this._height);
        }

        // set font before determining width
        this._textContext.font = this._font;

        // calculate width and height of text and add padding
        this._width = this._textContext.measureText(this._text).width + (this._padding * 4);
        
        // draw text label
        this._textContext.translate(this._padding, this._padding);
        this._textContext.fillStyle = "black";
        this._textContext.fillText(this._text, 0, 0);
        this._textContext.y = this._padding;
    }

    MenuItem.prototype.setState = function (state) {
        switch(state) {
            case "none":
            case "selected":
            case "focus":
                MenuItem.prototype._state = state;
                break;
        }

        this.updateState();
    };

    MenuItem.prototype.updateState = function() {
        var state = MenuItem.prototype._state;
    };

    MenuItem.prototype.setProp = function (key, value) {
        if (key === "x")
            this._textContext.x = value;

        console.log(value)
    }

    // Scope Helper --------------------------------------------
    window.MenuItem = MenuItem;
}(window));
