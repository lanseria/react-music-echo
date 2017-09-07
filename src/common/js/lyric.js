var s = `[ti:神无月 (日文版) ( 《神无月》手游主题曲)]
[ar:初音ミク (初音未来)]
[al:神无月]
[by:]
[offset:0]
[00:00.10]神无月 (日文版) ( 《神无月》手游主题曲) - 初音ミク (初音未来)
[00:00.20]词：KOUTAPAI
[00:00.30]曲：KOUTAPAI
[00:00.40]
[00:01.94]Wish a upon a star
[00:04.58]瞳閉じて
[00:06.16]愛を迎えに行こう
[00:07.97]ハイハイ
[00:08.53]夢を追い掛けよう
[00:10.29]Yes
[00:10.44]幸せ
[00:11.68]Yeah
[00:11.93]ずっと
[00:12.80]Whoo
[00:13.14]続いて行く様に
[00:15.77]シンナヅキコンパッション
[00:17.93]
[00:28.07]ため息つく間も無く
[00:30.50]全力でサポート
[00:32.71]出来もしない事なんて
[00:35.41]一つも無いから
[00:37.81]何も考えないで
[00:40.13]真に受けて大丈夫
[00:42.45]報われない事なんて
[00:44.94]絶対に無いから
[00:47.05]超大作の世界じゃ無くても
[00:51.83]最高の人生に
[00:54.47]Wish a upon a star
[00:57.30]瞳閉じて
[00:58.98]愛を迎えに行こう
[01:00.69]ハイハイ
[01:01.26]夢を追い掛けよう
[01:03.19]ハイハイ
[01:03.84]どんな憂い
[01:04.25]Yeah
[01:04.53]迷い悲しみ
[01:05.82]Whoo
[01:06.08]心配ないよそんなの
[01:07.76]もっと
[01:08.42]愛に身を委ねよう
[01:10.41]ハイハイ
[01:10.99]奇跡飛び越そう
[01:12.87]ハイハイ
[01:13.43]幸せ
[01:14.20]Yeah
[01:14.53]ずっと
[01:15.38]Whoo
[01:15.80]続いて行く様に
[01:18.09]シンナヅキコンパッション
[01:20.35]
[01:30.39]ドラマチックな演出で
[01:32.90]完全にサポート
[01:35.27]有り得ない事なんて
[01:37.70]何一つ無いから
[01:39.69]雄大な景色じゃ無くても
[01:44.46]色付いた人生に
[01:47.24]Wish a upon a star
[01:50.11]空を見上げ
[01:51.47]愛を迎えに行こう
[01:53.46]ハイハイ
[01:54.02]夢を追い掛けよう
[01:55.85]ハイハイ
[01:56.50]どんな悩み
[01:56.95]Yeah
[01:57.17]気負い物怖じ
[01:58.63]Whoo
[01:58.90]心配ないよそんなの
[02:00.63]もっと
[02:01.24]愛に身を委ねよう
[02:03.10]ハイハイ
[02:03.66]奇跡飛び越そう
[02:05.56]ハイハイ
[02:06.13]絆をずっと繋いで行ける様に
[02:10.84]シンナヅキコンパッション
[02:13.08]
[02:23.38]無邪気な笑顔貰って
[02:27.48]
[02:28.22]何度も救って救われて
[02:32.86]感じるこの愛
[02:35.20]終わらない夢を
[02:37.20]いつまでもずっと
[02:42.41]Wish a upon a star
[02:45.86]瞳閉じて
[02:47.32]愛を迎えに行こう
[02:49.07]ハイハイ
[02:49.64]夢を追い掛けよう
[02:51.63]ハイハイ
[02:52.28]どんな憂い
[02:52.69]Yeah
[02:52.84]迷い悲しみ
[02:54.32]Whoo
[02:54.59]心配ないよそんなの
[02:56.34]もっと
[02:57.00]愛に身を委ねよう
[02:58.91]ハイハイ
[02:59.46]奇跡飛び越そう
[03:01.26]ハイハイ
[03:01.84]幸せ
[03:02.66]Yeah
[03:03.02]ずっと
[03:03.78]Whoo
[03:04.16]続いて行く様に
[03:06.55]シンナヅキコンパッション`;


if(typeof binlyric !== 'object') {
  var binlyric = {};
}
binlyric = {
	edition:"1.1",
	obj:"",
	lyricCSS: {},
	txt:"",
	index:0,
	time: [],
	lyric: [],
	sort:function(){ // 冒泡排序（从小到大）
		var third;
		for(var j=0;j<this.index-1;j++)
		{
			for(var i=0;i<this.index-1;i++)
			{
				if(this.time[i]>this.time[i+1])
				{
					third = this.time[i];
					this.time[i] = this.time[i+1];
					this.time[i+1] = third;
					third = this.lyric[i];
					this.lyric[i] = this.lyric[i+1];
					this.lyric[i+1] = third;
				}
			}
		}
	},
	createPanel:function(){ // 创建歌词面板
		var i=0;
		document.querySelector(this.obj).innerHTML="";
		for(i=0;i<this.index;i++)
		{
			document.querySelector(this.obj).appendChild("<div>"+this.lyric[i]+"</div>");
		}
		// for(i in this.lyricCSS)
		// {
		// 	document.querySelector(this.obj).find("div").css(this.lyricCSS,this.lyricCSS[i]);
		// }
	},
	findTags:function(index,strArray,number){ // 查找标签（包括任何扩展的标签）
		// 此方法能匹配所有格式的标签
		// 因为此方法是在后面写的，所以时间标签并没有使用此方法
		number = number || this.txt.length;
		number = (number>this.txt.length) ? this.txt.length:number;
		var i, complete = 0, value;
		var obj = {};
		obj.booble = false;
		obj.value = "[";
		for(i=index;i<number;i++)
		{
			if(this.txt.substr(i,1)==strArray[complete].s)
			{
				complete+=1;
				if(complete>1)
				{
					if(complete<strArray.length)
					{
						obj.value += '{value:"'+this.txt.substr(value+1,i-value-1)+'"},';
					}
					else
					{
						obj.value += '{value:"'+this.txt.substr(value+1,i-value-1)+'"}]';
					}
				}
				if(complete==strArray.length)
				{
					obj.txt = this.txt.substr(index,i-index+1);
					obj.value = eval('('+obj.value+')');
					obj.index = i+1;
					obj.booble = true;
					break
				}
				value = i;
			}
			else if(this.txt.substr(i,1)=="\n")
			{
				obj.booble = false;
				return obj;
			}
			else if(this.txt.substr(i,1)==strArray[0].s && complete>0) // 遇到2次开始标志就退出
			{
				obj.booble = false;
				return obj;
			}
		}
		return obj;
	},
	findlyric:function(index){ // 查找歌词： 有则返回 歌词、继续查找的位置， 否则只返回继续查找的位置
		var obj = {};
		var str = this.txt;
		var i;
		for(i=index;i<str.length;i++)
		{
			if(str.charAt(i)=="[")
			{
				var _obj = this.findTags(i,[{s:"["},{s:":"},{s:"]"}]);
				if(_obj.booble)
				{
					obj.index = i;//i + _obj.txt.length;
					obj.lyric = str.substr(index,i-index);
					return obj;
				}
			}
			else if(str.charAt(i)=="\n")
			{
				obj.index = i+1;
				obj.lyric = str.substr(index,i-index);
				return obj
			}
		}
		if(i==str.length) // 专处理最后一句歌词（最后一句歌词比较特殊）
		{
			obj.index = i+1;
			obj.lyric = str.substr(index,i-index);
			return obj;
		}
		obj.index = i;
		return obj;
	},
	findTime:function(index){ // 查找时间 ： 有则返回 时间、继续查找的位置， 否则只返回继续查找的位置
		// 此功能可以用 findTags 方法实现，更简单、更强大、代码更少
		// findTags方法 是在后面写的，所以这里就不改了，具体可参考 findID方法里的使用实例
		var obj = {};
		var thisobj = this;
		var str = this.txt;
		obj.index = index;
		function recursion()
		{
			var _obj = thisobj.findTime(obj.index);
			if(_obj.time)
			{
				obj.time += _obj.time;
				obj.index = _obj.index;
			}
		}
		// --------------- 可以在这里 扩展 其它功能 ---------------
		// lrc歌词只能精确到每句歌词，可以通过扩展lrc 精确 到 每个字
		if(/\[\d{1,2}\:\d{1,2}\.\d{1,2}\]/.test(str.substr(index,10))) // [mm:ss.ff]
		{
			obj.time = str.substr(index+1,8) + "|";
			obj.index = index+9+1;
			recursion();
		}
		else if(/\[\d{1,2}\:\d{1,2}\]/.test(str.substr(index,7))) // [mm:ss]
		{
			obj.time = str.substr(index+1,5) + ".00" + "|";
			obj.index = index+6+1;
			recursion();
		}
		// 以下标签均属于合法标签，但很少被使用，请根据需要进行扩展
		// [mm:ss.f] [mm:s.ff] [mm:s.f] [m:ss.ff] [m:s.ff] [m:s.f]
		// [mm:s] [m:ss] [s:s]
		return obj;
	},
	findID:function(index){ // 查找预定义标识
		//[ar:艺人名]
		//[ti:曲名]
		//[al:专辑名]
		//[by:编者（指编辑LRC歌词的人）]
		//[offset:时间补偿值] 其单位是毫秒，正值表示整体提前，负值相反。这是用于总体调整显示快慢的。（很少被使用）
		// 注：本程序也不支持 offset 功能（但是能取值），如需要 请自行在 sort 方法添加此功能
		// 此处功能 使用 findTags方法 实现
		var obj;
		obj = this.findTags(index,[{s:"["},{s:":"},{s:"]"}]);
		if(obj.booble)
		{
			if(obj.value[0].value=="ar")
			{
				this.ar = obj.value[1].value;
			}
			else if(obj.value[0].value=="ti")
			{
				this.ti = obj.value[1].value;
			}
			else if(obj.value[0].value=="al")
			{
				this.al = obj.value[1].value;
			}
			else if(obj.value[0].value=="by")
			{
				this.by = obj.value[1].value;
			}
			else if(obj.value[0].value=="offset") // 这里是 offset 的值
			{
				this.offset = obj.value[1].value;
			}
		}
	},
	analysis:function(){ // 解析
		if(this.txt=="") return false;
		var str = this.txt;
		this.index = 0;
		for(var i=0;i<str.length;i++)
		{
			if(str.charAt(i)=="[")
			{
				var time = this.findTime(i); 
				if(time.time) // 时间标签
				{
					var lyric = this.findlyric(time.index);
					if(lyric.lyric!="\n" && lyric.lyric!="") // 去掉无意义歌词
					{
						var timeArray = time.time.split("|");
						for(var j=0;j<timeArray.length;j++)
						{
							if(timeArray[j])
							{
								this.time[this.index] = timeArray[j];
								this.lyric[this.index] = lyric.lyric;
								this.index+=1;
							}
						}
					}
					i = time.index;
				}
				else // 预定义标签
				{
					this.findID(i);
				}
			}
		}
		this.sort();
		this.createPanel();
	},
	play:function(position,CSS){ // 定位指定时间的歌词
		var time;
		var obj = this;
		function set(index)
		{
			var height = parseInt($(obj.obj).find("div").css("height"));
			var top = parseInt($(obj.obj).find("div").css("margin-top"));
			$(obj.obj).animate({
				scrollTop:(index*height+index*top-parseInt($(obj.obj).css("height"))/2+height/2)
			},300);
			for(var i in CSS)
			{
				$(obj.obj).find("div").eq(index).css(CSS,CSS[i]);
			}
		}
		for(var i=0;i<this.index;i++)
		{
			if(position==this.time[i])
			{
				Set(i);
				return;
			}
			else if(position>this.time[i])
			{
				time = i;
			}
		}
		set(time);// 没找到匹配时间 则就近最小选择
	}
};

binlyric.txt = s;
binlyric.obj = ".lyricPanel";
binlyric.lyricCSS = {"font-size":"16px","margin-top":"15px","text-align":"center"};
binlyric.analysis();
binlyric.play("01:20.22",{
	color:"red"
});
