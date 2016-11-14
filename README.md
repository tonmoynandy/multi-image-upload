# Multi Image Upload 

Multiple image upload by Drug and Drop

## Installation

add 	`jquery.js`, 
	`jquery-ui.min.js`,
	`multiple-image-upload.1.0.js`

and for css `multiple-image-upload.1.0.css`,
	    `font-awesome.css`

with your html file

## Usage

### HTML

for drug and drop box add the following html

<div class="dragBoxs">
<div class="heading"><i class="fa fa-cloud-upload" style="color:#14b9d6;font-size:50px;"></i> <font size="6">Drop Images</font>&nbsp;<span style="font-style:italic;font-size:15px"> to upload (or click)</span></div>
<input type="file" data-file-index='0' id='uploadPhoto' class='dragInput fileUpload' multiple accept='image/*'/>
</div>

for image showing area add this following html

<div class="photosDivSec">
<div class="loadMorePicContainer"></div>
</div>


### Javascript 

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
				'data': {'id':1,'_token':'XXXXXXXXXXXX'}, //optional, here we have used data for example
		                
		                },
		            'uploadImg':{
		                'url': "action/uploadimages.php",
				'data': {'id':1,'_token':'XXXXXXXXXXXX'}, //optional, here we have used data for example
		                },
		            'removeImg':{
		                'url':"action/removeimages.php",
				'data': {'id':1,'_token':'XXXXXXXXXXXX'}, //optional, here we have used data for example
		            }
		         };
	    propertyGallery.init(option);
	}

       

    }

});

## Description of options

     `browseBtn` = <input type="file" data-file-index='0' id='uploadPhoto' class='dragInput fileUpload' multiple accept='image/*'/>

     `container` = <div class="photosDivSec"></div>  [The image container]

     `pegilimit` = [Number of images will show at a time]
     
     `imgLoad`   = [loading images path with custom data]

     `uploadImg` = [upload images path with custom data]

     `removeImg` = [remove images path with custom data]









