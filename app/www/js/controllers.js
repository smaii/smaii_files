angular.module('starter.controllers', [])

.controller('InfoCtrl', function($scope) {
    function getValue(id){
        return document.getElementById(id).value;
    }
    var keys = ["name","zhuanye","idcard","email","phone"];
    //储存信息
    $scope.save = function(){
        var info = {
            "name" : getValue("name"),
            "zhuanye" : getValue("zhuanye"),
            "idcard" : getValue("idcard"),
            "email" : getValue("email"),
            "phone" : getValue("phone")
        };
        for ( var key in info){
            //本地储存
            localStorage.setItem(key,info[key]);
            //console.log(key,info[key]);
            //console.log(localStorage);
        }
    };
    //同步信息
    $scope.reader = function(){
        for ( var i=0,len = keys.length; i<len ;i++){
            document.getElementById(keys[i]).value = localStorage.getItem(keys[i]);//本地读取
            //console.log(localStorage);
        }
    };
    // document.addEventListener("deviceready", function () {
    //     $scope.reader();
    // },false);
})

.controller('LikeCtrl', function($scope) {})

.controller('PictureCtrl', function($scope,$cordovaCamera) {

    document.addEventListener("deviceready", function () {

        //数组储存照片地址
        $scope.photos = [];
        //getphoto方法调用照相机或者访问图库
        $scope.getphoto = function(type){//type参数设置决定获取照片的方式,camera或者savedphotoalbum
            $cordovaCamera.getPicture({
                quality: 80, //保存的图像质量，范围为0 - 100
                destinationType: Camera.DestinationType.FILE_URL,//
                sourceType: Camera.PictureSourceType[type.toUpperCase()],//设置图片来源,用toUpperCase方法转大写
                //allowEdit: true,
                // encodingType: Camera.EncodingType.JPEG, //	JPEG = 0, PNG = 1
                 targetWidth: 100, //缩放图像的宽度（像素）
                // targetHeight: 100,
                // cameraDirection: 0, //Back = 0, Front-facing = 1
                // popoverOptions: CameraPopoverOptions, //iOS,iPad弹出位置
                 saveToPhotoAlbum: true, //	是否保存到相册
                 correctOrientation:true //设置摄像机拍摄的图像是否为正确的方向
            }).then(function(imageData) {
               // $scope.time = new Data();
               //  var container= document.getElementById('picContainer');
               //  var image = document.createElement('img');
               //  var h2 = document.createElement('h2');
               //  var p = document.createElement('p');
               //  var time = new Data();
               //  image.src = imageData;
               //  h2.innerText = "MY PICTURES" ;
               //  p.innerHTML = time ;
               //  container.appendChild(image);
               //  container.appendChild(h2);
               //  container.appendChild(p);

                // alert($scope.photos);
                var time = new Date();
                time = time.toLocaleString();
                 $scope.photos[$scope.photos.length]=[imageData,time,$scope.photos.length+1];
                 localStorage.setItem($scope.photos.length,imageData);
                // alert($scope.photos);
            }, function(err) {
                alert(err);
            });
        };

    }, false);
})

.controller('MapCtrl', function($scope){
    $scope.position = [];
    $scope.getpoint = function () {
        var map = new BMap.Map("mapContainer");
        // var point = new BMap.Point(116.331398,39.897445);
        // map.centerAndZoom(point,13);

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                map.centerAndZoom(r.point,13);
                map.addOverlay(mk);
                map.panTo(r.point);
                //alert('您的位置：'+r.point.lng+','+r.point.lat);
                $scope.position.push(r.point.lng,r.point.lat);
            }
            else {
                alert('failed'+this.getStatus());
            }
        },{enableHighAccuracy: true})
        // var map = new BMap.Map("mapContainer");          // 创建地图实例
        // var point = new BMap.Point( longitude,latitude);  // 创建点坐标
        // map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
        // map.enableScrollWheelZoom(true);

    }

    $scope.getsearch = function(){
        var map = new BMap.Map("mapContainer");
        map.centerAndZoom(new BMap.Point($scope.position[0],$scope.position[1]), 13);
        var local = new BMap.LocalSearch(map, {
            renderOptions:{map: map}
        });
        var value = document.getElementById('search').value;
        if(value === null) return ;
        else local.search(value);

    };

});
