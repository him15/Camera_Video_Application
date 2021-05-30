// constraint which we want 
let videoRecorder = document.querySelector("#record_video");
let videoElem = document.querySelector("#video_elem");
let captureBtn = document.querySelector("#capture");
let timing = document.querySelector("#timing");
let recordState = false;
let clearObj;
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
         videoRecorder.classList.add("record-animation");
         startCounting();
         recordState = true;
        }else{
            mediaRecorder.stop();
            videoRecorder.classList.remove("record-animation");
            stopCounting();
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
    captureBtn.classList.add("camera-animation");
     // download code
     let anchor = document.createElement("a");
     anchor.href = link;
     anchor.download = "file.png";
     anchor.click();
     anchor.remove();
     canvas.remove();


 })

 function startCounting(){
    timing.classList.add("timing-active");
    let timeCount = 0;
    clearObj = setInterval(function(){
        let second = (timeCount%60)<10 ? `0${timeCount % 60}` : `${timeCount%60}`;
        let minutes = (timeCount/60)<10 ? `0${Number.parseInt(timeCount/60)}` : `${Number.parseInt(timeCount/60)}`;
        let hours = (timeCount/3600)<10 ? `0${Number.parseInt(timeCount/3600)}` : `${Number.parseInt(timeCount/3600)}`;
        timing.innerText = `${hours}:${minutes}:${second}`;
    timeCount++;
    } , 1000)

 }
 function stopCounting(){
    timing.classList.remove("timing-active");
    timing.innerText = "00:00:00";
    clearInterval(clearObj);
 }