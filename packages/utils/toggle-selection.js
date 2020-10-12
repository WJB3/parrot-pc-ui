
export default function toggleSelection() {
    var selection = document.getSelection();
  
    var active = document.activeElement;
  
    var ranges = [];
    for (var i = 0; i < selection.rangeCount; i++) {
      ranges.push(selection.getRangeAt(i));
    }
  
    switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
      case 'INPUT':
      case 'TEXTAREA':
        active.blur();
        break;
  
      default:
        active = null;
        break;
    }
  
    selection.removeAllRanges();
    
  };
  