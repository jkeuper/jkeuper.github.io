(function() {
  function makeClickable(imgs) {
    var i;
    for (i = 0; i < imgs.length; i++)
    {
        var img = imgs[i];
	img.style.cursor = 'pointer';
	img.onclick = function()
        {
          if (this.oldClassName && this.oldClassName.length > 0)
          {
              this.className += this.oldClassName;
  	    this.oldClassName = '';
  	}
  	else
  	{
  	    this.oldClassName = this.className;
              this.className += ' zoom';
  	}
          return false;
        };
    }
  }

  var imgs = document.getElementsByClassName('media pull-right img-thumbnail');
  makeClickable(imgs);
  imgs = document.getElementsByClassName('media pull-left img-thumbnail');
  makeClickable(imgs);
})();
