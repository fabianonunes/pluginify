var $ = require('jquery')
var slice = [].slice

module.exports = function (pluginName, factory) {
  var old = $.fn[pluginName]

  $.fn[pluginName] = function (optionsOrMethod) {
    var args = slice.call(arguments, 1)
    var firstOnly
    var methodResult
    var each = this.each(function () {
      var plugin = $.data(this, 'plugin-' + pluginName)
      if (!plugin) {
        $.data(this, 'plugin-' + pluginName, factory(this, optionsOrMethod))
      } else if (plugin[optionsOrMethod]) {
        methodResult = plugin[optionsOrMethod].apply(plugin, args)
        if (methodResult !== this) {
          firstOnly = true
          return false
        }
      }
      return this
    })

    return firstOnly ? methodResult : each
  }

  $.fn[pluginName].factory = factory

  $.fn[pluginName].noConflict = function () {
    $.fn[pluginName] = old
    return this
  }
}
