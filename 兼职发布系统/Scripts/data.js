$(document).ready(function () {
	jeDate('#startTime', {
		minDate: '1990-01-01',
		isinitVal: true,
		format: 'YYYY-MM-DD',
		onClose: false,
		donefun:function(obj){
			// console.log(obj)
			var saliDate=obj.val.split("-");
			// console.log(saliDate)
			var riNum=0;
			var yueNum=0;
			var nianNum=saliDate[0];
			// console.log(saliDate[1]-1)
			// //判断月 同时判断年
			if(saliDate[1]-1<=0&&saliDate[2]=="01"){
				yueNum=12;
				riNum=31;
				nianNum=nianNum;
				// console.log(nianNum,yueNum,riNum)
				$("#endTime").val(nianNum+"-"+yueNum+"-"+riNum)
				return false;
			}else {
				yueNum=saliDate[1];
				nianNum=nianNum-0+1;
			}
			//当 日 是01 的时候要判断当前下一个月是否为31 还是30天  在判断一个是否为闰年  2月份是29 还是28
			if(saliDate[2]=="01"){
				switch(saliDate[1]-1){
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 0://0就是12月  因为是只有点击的是2019-01-01  才会是2018-12-31
						riNum=31;
						yueNum="0"+(saliDate[1]-1);
						break;
					case 4:
					case 6:
					case 9:
					case 11:
						riNum=30;
						yueNum="0"+(saliDate[1]-1);
						break;
				}
				if(saliDate[1]-1==2){
					yueNum="0"+(saliDate[1]-1);
					//判断是否为闰年
					if(isLeap(saliDate[0])==1){
						riNum=29;
					}else{
						riNum=28;
					}
				}
			}else{
				if(saliDate[2]-1<=9){
					riNum="0"+(saliDate[2]-1);
				}else{
					riNum=saliDate[2]-1;
				}
			}
			$("#endTime").val(nianNum+"-"+yueNum+"-"+riNum)
			// console.log(nianNum,yueNum,riNum)
		}
	});
	jeDate('#endTime', {
		minDate: '1990-01-01',
		isinitVal: true,
		format: 'YYYY-MM-DD',
		onClose: false
	});
	
   //判断是否为闰年  若为闰年，返回1，反之则返回0
	function isLeap(year) {
		if((year%4==0 && year%100!=0)||(year%400==0)){
			return 1;
		}
		return 0;
    }
})