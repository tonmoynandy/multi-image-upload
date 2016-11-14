$(function(){
    if( $(".photosDivSec").length > 0){
        if ($(".imgBox").length > 0) {
           var propertyGallery = new MultipleImageUploader();
            var option = {
                            'browseBtn':"#uploadPhoto",
                            'container':'.photosDivSec',
                            'pegilimit': 3,
                            'imgLoad':{
                                'url': "action/loadmoreimages.php",
                                
                                },
                            'uploadImg':{
                                'url': "action/uploadimages.php",
                                },
                            'removeImg':{
                                'url':"action/removeimages.php",
                            }
                         };
            propertyGallery.init(option);
        }
        
       
        
    }
        
});