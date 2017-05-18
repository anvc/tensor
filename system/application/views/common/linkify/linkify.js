// http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
if(!String.linkify) {
    String.prototype.linkify = function() {

        return (-1 != this.indexOf('//')) ? '<a target="_blank" href="'+this+'">'+this+'</a>' : this; 
        
    };
}