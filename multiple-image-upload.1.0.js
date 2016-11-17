var uploaderObj = '';
var MultipleImageUploader = function(){
    
    uploaderObj             = this;
    uploaderObj.upFiles       = [];
    
};
MultipleImageUploader.prototype.init = function(option) {
    uploaderObj.defaultLimit = 2;
    if (option.defaultLimit !== undefined) {
        uploaderObj.defaultLimit = option.defaultLimit;
    }
    
    uploaderObj.pegilimit = 3;
    if (option.pegilimit !== undefined) {
        uploaderObj.pegilimit = option.pegilimit;
    }
    
    if (option.container.length > 0) {
        uploaderObj.main_container = document.querySelector(option.container);
    }
    if (option.browseBtn.length > 0) {
       uploaderObj.target             = document.querySelector(option.browseBtn);
       if (uploaderObj.target != null) {
           uploaderObj.target.addEventListener("change",uploaderObj.preview,false);
       }
    }
    if (option.btn.length > 0) {
        uploaderObj.targetBtn          = document.querySelector(option.btn);
        if (uploaderObj.targetBtn != null) {
            uploaderObj.targetBtn.addEventListener("click",uploaderObj.uploadMask,true);
        }
    }
    uploaderObj.imgLoad         = option.imgLoad;
    uploaderObj.uploadImg       = option.uploadImg;
    uploaderObj.removeImg       = option.removeImg;
    //uploaderObj.uploadImgUrl    = option.uploadImgUrl;
    //uploaderObj.loadImgUrl      = option.loadImgUrl;
    
    //uploaderObj.removeImgUrl    = option.removeImgUrl;
    uploaderObj.lightBoxContainer();
    uploaderObj.alertContainer();
    uploaderObj.loadBigImage();
    uploaderObj.loadbtn = uploaderObj.loadMorebtn();
    uploaderObj.loadImages();
}

MultipleImageUploader.prototype.loadImages = function() {
    var offset = Number($('.loadMorePhoto').attr('data-offset'));
   
    var pegilimit = Number(uploaderObj.pegilimit);
    var ajax = new XMLHttpRequest();
    ajax.open("POST", uploaderObj.imgLoad.url ,true);
    var formData = new FormData();
    if(uploaderObj.imgLoad.data != undefined){
        $.each(uploaderObj.imgLoad.data,function(i,v){
           formData.append(i,v);
       })
    }
    formData.append('offset', offset);
    formData.append('limit', pegilimit);
    
    ajax.send(formData);
    var element =  $('.loadMorePhoto');
    ajax.onreadystatechange = function() {
    if (ajax.readyState == 2 && ajax.status == 200){ // before send
        $(element).find('i').removeClass('no_display');
       
    }
    else if (ajax.readyState == 4 && ajax.status == 200){ // success 
      var response = ajax.responseText;
      response = $.parseJSON(response);
      var total = Number(response.total);
      $.each(response.photo,function(i,v){
        var ind = Number(offset)+(i+1);
        var imageURl = v;
        var h = $("<div/>").prependTo('.loadMorePicContainer').addClass('photosDiv');
        
        var h_s = $("<span/>").appendTo(h)
                                .addClass('removePhoto')
                                .bind('click',function(){ uploaderObj.removeImage(this) })
                                .attr('data-item-index',ind)
                                .append('<i class="fa fa-remove"></i>');
        
        var h_a = $("<a/>").appendTo(h).addClass('photoBox').attr('href','javascript:');
        $(h_a).on('click',uploaderObj.loadBigImage());
        $(h_a).css('opacity',1);
        var h_i = $('<img/>').appendTo(h_a).attr('src',imageURl).attr('width',312).attr('height',245);
        $(".loadMorePicContainer").show();
       
      });
      offset = Number(offset+pegilimit);
      $(element).attr('data-offset',offset);
      $(element).find('.fa-refresh').addClass('no_display');
      $("#uploadPhoto").attr('data-file-index',uploaderObj.main_container.querySelectorAll('.photosDiv').length);
      if (offset >= total ) {
        $(element).hide();
      }
    }
    }
  
}

MultipleImageUploader.prototype.loadBigImage = function() {
    var imgCon = uploaderObj.main_container.querySelectorAll('.photosDiv');
    
    for(var x =0; x < imgCon.length; x++){
        var i = imgCon[x].querySelector('a');
        //i.addEventListener('click',loadBigImg, false);
        
        $(i).bind('click',function(){
            $('.photosDiv').removeClass('active');
            var mainCon = $(this).parents('.photosDiv').addClass('active');
            var img = $(this).find('img').attr('src');
            if (img !=undefined) {
                img = img.replace('/thumb/','/');
               var lightBox =  $(uploaderObj.main_container).find('.image-light-box');
               lightBox.find('img').remove();
               lightBox.addClass('active-light-box');
               lightBox = $(lightBox).find('.light-box-container');
               $("<img/>").appendTo(lightBox).attr('src',img);
            }
        })
    }

  
}
MultipleImageUploader.prototype.loadMorebtn = function(){
    var container = $(uploaderObj.main_container);
    var loadBtn = $("<a/>").prependTo(container)
                            .html('Load More Images <i class="fa fa-refresh fa-spin"></i>')
                            .addClass('loadMorePhoto clear btn btn-success')
                            .attr('href','javascript:void(0)')
                            .attr('data-offset',0)
                            .bind('click',function(){ uploaderObj.loadImages()});
                            
    return loadBtn;
}
MultipleImageUploader.prototype.alertContainer = function() {
   
    var container = $(uploaderObj.main_container);
    var mainContainer = $("<div/>").appendTo(container).addClass('imageLightBox alert-light-box');
    $("<div/>").appendTo(mainContainer).addClass('light-box-overlay');
    var popContainer = $("<div/>").appendTo(mainContainer).addClass('light-box-main-container').addClass('alert-light-box-main-container');
    
    var headerContainer = $("<div/>").appendTo(popContainer).addClass('light-box-header');
    $(headerContainer).append('<strong>Alert!</strong>');
    $("<span/>").appendTo(headerContainer)
                .addClass('light-box-cross')
                .html('<i class="fa fa-remove"></i>')
                .bind('click',function(){
                    $(this).parents(".alert-light-box").removeClass('active-light-box');
                    });
    
    var alertContainer = $("<div/>").appendTo(popContainer).addClass('light-box-container');
    
};
MultipleImageUploader.prototype.lightBoxContainer = function() {
   
    var container = $(uploaderObj.main_container);
    var mainContainer = $("<div/>").appendTo(container).addClass('imageLightBox image-light-box');
    var cross = $("<div/>").appendTo(mainContainer)
               .addClass('light-box-cross')
               .bind('click',function(){
                    $(".image-light-box").removeClass('active-light-box');
                    });
   
    $(cross).append("<i class='fa fa-times-circle'></i>");
    $("<div/>").appendTo(mainContainer)
                .addClass('light-box-overlay')
                .bind('click',function(){
                    $(".image-light-box").removeClass('active-light-box');
                    });
    var popContainer = $("<div/>").appendTo(mainContainer).addClass('light-box-main-container');
    
    //var headerContainer = $("<div/>").appendTo(popContainer).addClass('light-box-header');
    //$(headerContainer).append('<strong>Photos</strong>');
    //$("<span/>").appendTo(headerContainer)
    //            .addClass('light-box-cross')
    //            .html('<i class="fa fa-remove"></i>')
    //            .bind('click',function(){
    //                $(".image-light-box").removeClass('active-light-box');
    //                });
    
    var navContainer = $("<div/>").appendTo(popContainer).addClass('light-box-next-prev');
    
    var prev = $("<a/>").appendTo(navContainer)
                        .addClass('light-nav-icon light-nav-prev')
                        .attr('title','Previous')
                        .bind('click',function(){ uploaderObj.loadNextPrevImg($(this)) });
    $("<span/>").appendTo(prev).html('<i class="fa fa-angle-double-left"></i>');
    
    
    var next = $("<a/>").appendTo(navContainer)
                        .addClass('light-nav-icon light-nav-next')
                        .attr('title','Next')
                        .bind('click',function(){ uploaderObj.loadNextPrevImg($(this)) });
   
    $("<span/>").appendTo(next).html('<i class="fa fa-angle-double-right"></i>');
    
    
    
    var loader = $("<span/>").appendTo(navContainer).addClass('light-nav-icon light-nav-loader');
    $(loader).html('<i class="fa fa-spinner fa-spin"></i>');
    
    var imgContainer = $("<div/>").appendTo(popContainer).addClass('light-box-container');
    
};
MultipleImageUploader.prototype.uploadImage = function (file,index) {
        var formData = new FormData();
        formData.append('image', file);
        if (uploaderObj.uploadImg.data != undefined) {
            $.each(uploaderObj.uploadImg.data,function(i,v){
                formData.append(i,v);
            })
        }
       
        //formData.append('id', $("input[name=id]").val());
        
        var ajax = new XMLHttpRequest();
        ajax.open("POST", uploaderObj.uploadImg.url,true);
         
         var ind = Number($("#uploadPhoto").attr('data-file-index'));
         var progressbar = $(".photosDiv:eq("+ind+")").find('.subProgressBar'),
        progressLabel = $(".photosDiv:eq("+ind+")").find('.subProgressBar').find('.progress-label');
        progressbar.progressbar({
            value: false,
            change: function(event, ui) {
            
              progressLabel.text( progressbar.progressbar( "value" ) + "%" );
            },
            complete: function(event, ui) {
              progressLabel.text( "Complete!" );
            }
          });
         ajax.upload.addEventListener("loadstart", function (evt) {
          
         }, true);
    
        ajax.upload.addEventListener("progress", function (evt) {
            
            var percentLoaded = parseInt( (evt.loaded / evt.total) * 100) ;
            progressbar.progressbar( "value", percentLoaded );
            
        }, true);
    
        ajax.upload.addEventListener("load", function (evt) {
           $(".photosDiv:eq("+ind+")").find('.photoBox').css('opacity',1);
           
           $("<span/>").appendTo($(".photosDiv:eq("+ind+")"))
                                .addClass('removePhoto')
                                .bind('click',function(){ uploaderObj.removeImage(this) })
                                .attr('data-item-index',ind)
                                .append('<i class="fa fa-remove"></i>');
          // $(".photosDiv:eq("+ind+")").prepend('<span class="removePhoto"  data-item-index="'+ind+'"><i class="fa fa-remove"></i></span>');
        
           ind = ind+1;
           $("#uploadPhoto").attr('data-file-index',ind);
           
           $(progressbar).parent().remove();
        }, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
               $(".photosDiv:eq("+(ind-1)+")").find('.photoBox').find('img').attr('src',ajax.responseText);
               setTimeout(function(){
                        var i = index+1;
                        if (i < uploaderObj.upFiles.length) {
                                 var reader = new FileReader();
                                  reader.onload = function (e) {
                                      uploaderObj.uploadImage(e.target.result,i)
                                  }
                                  reader.readAsDataURL(uploaderObj.upFiles[i]);
                         }
                },2000);
              // $(uploaderObj.loadbtn).hide();
            }
        };
        
        ajax.send(formData);
        
         
        
    }
MultipleImageUploader.prototype.uploadMask = function() {
    
    uploaderObj.target.click();
}
MultipleImageUploader.prototype.preview = function() {
   
   var fileList = this.files;
   uploaderObj.upFiles = fileList;
   
   var anyWindow = window.URL || window.webkitURL;

            if($(uploaderObj.main_container).find(".photosDiv").length >= uploaderObj.totalImg){
               uploaderObj.openAlert('maximum '+uploaderObj.totalImg+' photo will be uploaded. <br/> Already '+$(uploaderObj.main_container).find(".photosDiv").length+' photos are exists.');
               return false;
            }
            
            else if(fileList.length > uploaderObj.totalImg){
               uploaderObj.openAlert('maximum '+uploaderObj.totalImg+' photo will be uploaded.');
               return false;
            }
            
            else if(($(uploaderObj.main_container).find(".photosDiv").length + fileList.length) > uploaderObj.totalImg){
               uploaderObj.openAlert('maximum '+uploaderObj.totalImg+' photo will be uploaded. <br/> Already '+$(uploaderObj.main_container).find(".photosDiv").length+' photos are exists.<br/>Now you can only upload '+(uploaderObj.totalImg-$(uploaderObj.main_container).find(".photosDiv").length )+' images more.');
               return false;
            }
            
            $('body,html').animate({ scrollTop : $(document).height() }, 500);
   
            for(var i = 0; i < fileList.length; i++){
              //get a blob to play with
              var objectUrl = anyWindow.createObjectURL(fileList[i]);
              // for the next line to work, you need something class="preview-area" in your html
              var h = $("<div/>").appendTo('.loadMorePicContainer').addClass('photosDiv');
              var h_a = $("<a/>").appendTo(h).addClass('photoBox').attr('href','javascript:');
              $(h_a).on('click',uploaderObj.loadBigImage());
              var h_i = $('<img/>').appendTo(h_a).attr('src',objectUrl).attr('width',312).attr('height',245);
              var h_p = $('<div/>').appendTo(h).addClass('progessBar').attr('id','progress_'+i);
              var h_s_p = $("<div/>").appendTo(h_p).addClass('subProgressBar');
              $("<div/>").appendTo(h_s_p).addClass('progress-label').text('Loading...');
              $('.loadMorePicContainer').show();
              
              // get rid of the blob
              window.URL.revokeObjectURL(fileList[i]);
            }
           
            $('.loadMorePicContainer').show();
            var i = 0;
            var reader = new FileReader();
            reader.onload = function (e) {
                uploaderObj.uploadImage(e.target.result,i)
            }
            reader.readAsDataURL(fileList[i]);
            //var interval = setInterval(function(){
            //    if (i< fileList.length) {
            //        if (fileList[i]) {
            //            var reader = new FileReader();
            //
            //            reader.onload = function (e) {
            //                uploaderObj.uploadImage(e.target.result)
            //            }
            //            reader.readAsDataURL(fileList[i]);
            //           
            //        }
            //        i++;
            //    }
            //   
            //   if (i == fileList.length ) {
            //     clearInterval(interval);
            //   }
            //},5000);
};
MultipleImageUploader.prototype.removeImage = function(element) {
    $(element).parents('.photosDiv').fadeOut('slow');
    var ajax = new XMLHttpRequest();
    ajax.open("POST", uploaderObj.removeImg.url,true);
    var formData = new FormData();
    if(uploaderObj.removeImg.data != undefined){
        $.each(uploaderObj.removeImg.data,function(i,v){
           formData.append(i,v);
       })
    }
    formData.append('image', $(element).parents('.photosDiv').find('img').attr('src'));
    ajax.send(formData);
}
MultipleImageUploader.prototype.loadNextPrevImg = function (element){
    
        var ind = $(".photosDiv").index($(".photosDiv.active"));
        
        if ($(element).hasClass('light-nav-next')) {
            ind = ind+1;
        }else if ($(element).hasClass('light-nav-prev')) {
            ind = ind-1;
        }
       
        $(".light-nav-next").show();
        $(".light-nav-prev").show();
        if ($(".photosDiv").length == 1) {
            $(".light-nav-next").hide();
            $(".light-nav-prev").hide();
        }
        if (ind == 0) {
            $(".light-nav-prev").hide(); 
        }
        
        if (ind == ($(".photosDiv").length -1)) {
            $(".light-nav-next").hide();
            
        }
        var img = $(".photosDiv:eq("+ind+") img").attr('src');
        if (img !=undefined) {
            $('.photosDiv').removeClass('active');
            $('.photosDiv:eq('+ind+')').addClass('active');
            img = img.replace('/thumb/','/');
           var lightBox =  $(uploaderObj.main_container).find('.image-light-box');
           lightBox.find('img').remove();
           lightBox.addClass('active-light-box');
           lightBox = $(lightBox).find('.light-box-container');
           $("<img/>").appendTo(lightBox).attr('src',img);
        }
    }
MultipleImageUploader.prototype.openAlert = function(msg){
    $(".alert-light-box .light-box-container").html(msg);
    $(".alert-light-box").addClass("active-light-box");
}



    
    
    
