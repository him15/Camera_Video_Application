// constraint which we want 
let videoRecorder = document.querySelector("#record_video");
let videoElem = document.querySelector("#video_elem");
let captureBtn = document.querySelector("#capture");
let recordState = false;
 let constraint = {
     video : true ,
     audio : true 
 }
 let mediaRecorder;
 let buffer = []


 navigator.mediaDevices.getUserMedia(constraint).then(function(mediaStream){
     // if we want to put aby feed then we use srcObject 
     videoElem.srcObject = mediaStream;
     // audioElem.srcObject = mediaStream;
     mediaRecorder = new MediaRecorder(mediaStream);
        // if the media start recording ...
         mediaRecorder.addEventListener("dataavailable" , function(e){
             buffer.push(e.data);
         })
         mediaRecorder.addEventListener("stop" , function(){
             // mime type
             let blob = new Blob(buffer , { type: "video/mp4"});
             // blob convert url
             const url = window.URL.createObjectURL(blob);
             // download btn 
             let a = document.createElement("a");
             // download 
             a.download = "file.mp4";
             
             a.href = url;
             a.click();
         })
     
     
 }).catch(function(err){
     console.log(err);
 })
 
 videoRecorder.addEventListener("click" , function(){
     if(recordState == false){
         mediaRecorder.start();
         videoRecorder.innerHTML = "Recording...";
         recordState = true;
     }else{
         mediaRecorder.stop();
         videoRecorder.innerHTML = "Record";
         recordState = false;
     }
 })

 captureBtn.addEventListener("click" , function(){
     // create a canvas Element 
     let canvas = document.createElement("canvas");
     // width and height will equal to your video frame
     canvas.width = videoElem.videoWidth;
     canvas.height = videoElem.videoHeight;
     let tool = canvas.getContext("2d");
     // draw a frame on that canvas...
     tool.drawImage(videoElem , 0 , 0);
     let link = canvas.toDataURL(); // convert image into url

     // download code
     let anchor = document.createElement("a");
     anchor.href = link;
     anchor.download = "file.png";
     anchor.click();
     anchor.remove();
     canvas.remove();

 })