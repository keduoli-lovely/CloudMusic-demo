<template>
	<view class="maxmusic night" :style="{bottom : long +'vh' }">
		<view class="musicmask">

		</view>
		<view class="musicbox">

			<view class="listboxmask" @click="quitlist" v-if="showlistboxnum"></view>
			<view class="listdelmask" @click="quitdel" v-if="isdel"></view>

			<view class="listbox" :style="`bottom: ${listboxbottom}`">
				<view class="minlistbox">
					<view class="delmask" v-if="isdel">
						<view class="deltop">
							确定要清空播放列表?
						</view>
						<view class="delright">
							<view class="yesdel" @click="yesdel(),xiank()">
								确定
							</view>
							<view class="delno" @click="delno">
								取消
							</view>
						</view>
					</view>
					<view class="top">
						<text class="t1">当前播放</text><text class="t2">
							({{musicnum}})
						</text>
					</view>
					<view class="btn">
						<view class="random">
							<view class="ranicon">
								<image src="../../static/icon/random-forest.png" mode="aspectFit"></image>
							</view>
							<text class="t3">{{listboxtitle}}</text>
						</view>

						<view class="downlis">
							<view class="downlist1">
								<image src="../../static/icon/平台下载.png" mode="aspectFit"></image>
							</view>
							<view class="addlist1">
								<image src="../../static/icon/添加.png" mode="aspectFit"></image>
							</view>
							<view class="clearlis1" @click="dellist">
								<image src="../../static/icon/删除2.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
					<view class="musiclist">
						<scroll-view scroll-y>
							<view class="scr-list" v-for="(item, index) in musicplaylist" :key="item.e"
								@click="horplay(index)">
								<view class="scr-box" id="list">
									<text class="name">{{item.title}}</text> <text class="t4">-</text><text
										class="singer">{{item.name}}</text>
								</view>

								<view class="scr-clear" v-if="item.name">
									<image src="../../static/icon/关闭2.png" mode="aspectFit"></image>
								</view>

							</view>
						</scroll-view>
					</view>
				</view>
			</view>




			<!-- <audio :src="music"></audio> -->
			<view class="leftbox" @click="full">
				<view class="leftpic">
					<image :src="imgk1" mode="aspectFill" class="pick"></image>
				</view>
				<view class="title">
					<text class="t18">{{name1}}</text>-<text class="t17">{{ren1}}</text>
				</view>
			</view>

			<view class="rightbox">
				<view class="startk" @click="setk">
					<image :src="playUrl" mode="aspectFit" class="startpic"></image>
				</view>
				<view class="morek" @click="showlistbox(),colorchange()">
					<image src="/static//icon/24gf-playlist.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>


		<view class="musicbottom">
			<!-- 背景模糊 -->
			<view class="bgpic" :style="{ backgroundImage: `url(${imgk1})` }">
			</view>

			<!-- 顶部 -->
			<view class="topbar">
				<view class="topmask">

				</view>
				<!-- 返回图标 -->
				<view class="baricon" @click="minbark">
					<image src="../../static/icon/返回4.png" mode="aspectFit"></image>
				</view>
				<!-- 歌名 -->
				<view class="bartit">
					<view :class="rotation">
						{{name1}}
					</view>
					<text class="t19">{{ren1}}</text>
				</view>
				<!-- 分享图标 -->
				<view class="bargive">
					<image src="/static/icon/3.1分享.png" mode="aspectFit"></image>
				</view>
			</view>

			<!-- 中心大圆图 -->
			<view class="center-box">
				<view class="maskcenterbox" @click="shougeci">
					<view class="boxk1" v-show="!geci">
						<view class="contentk1" :style="`top:${timeheight}rpx`">
						</view>
					</view>
				</view>
				<!-- <view class="bgpic" :style="{ backgroundImage: `url(${imgk})` }">
				</view> -->
				<!-- 小盒子用于设置边框 -->
				<view class="center-min" :style="{animationPlayState: kk1==0 ? 'running' : 'paused'}" v-show="geci">
					<!-- 图片 -->
					<view class="center-pic">
						<image :src="imgk1" mode="aspectFill"></image>
					</view>
				</view>

			</view>

			<!-- 底部功能 -->
			<view class="bottom-bar">
				<view class="play-topbar">
					<!-- 爱心 -->
					<view class="loveicon">
						<image src="/static/icon/爱心.png" mode="aspectFit"></image>
					</view>
					<!-- 下载 -->
					<view class="downicon">
						<image src="/static/icon/平台下载.png" mode="aspectFit"></image>
					</view>
					<!-- 评论 -->
					<view class="plicon" @click="getcomments">
						<image src="/static/icon/评论.png" mode="aspectFit"></image>
						<view class="numtop">
							{{topnum}}
						</view>
					</view>
					<!-- 更多 -->
					<view class="moreicon">
						<image src="/static/icon/Android更多.png" mode="fit"></image>
					</view>
				</view>
				<view class="play-linebar">
					<view class="time1">
						{{playfirst}}<text class="t20">:</text>{{playlast}}
					</view>
					<slider class="timeline" block-size="12" backgroundColor="rgba(255,255,255,.5)" :value="live"
						activeColor="#fff" @change="changeline" cancelable=false></slider>

					<view class="time2">
						{{allfirst}}<text class="t20">:</text>{{alllast}}
					</view>
				</view>
				<view class="playbottombar">
					<!-- 切换 -->
					<view class="toggle">
						<view class="toone" @click="changepic">
							<image :src="picpath" mode="aspectFit"></image>
						</view>
					</view>
					<view class="before" @click="forward">
						<image src="../../static/icon/上一首.png" mode="fit"></image>
					</view>
					<view class="stoplive" @click="setk">
						<image :src="playUrl" mode="aspectFit"></image>
					</view>
					<view class="after" @click="down">
						<image src="../../static/icon/下一首.png" mode="aspectFit"></image>
					</view>
					<view class="livelist" @click="showlistbox">
						<image src="/static/icon/24gf-playlist.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper';

	export default {
		name: "minmusic",
		data() {
			return {
				strnum: 0,
				timer: null,
				long: this.dd,
				url1: "/static/icon/暂停.png",
				url2: "/static/icon/播放.png",
				topnum: helper.plnumstr,
				// none: 'none',
				live: helper.pace.visible,
				detliek: 0,
				firsttime: helper.pace.firsttime,
				lasttime: helper.pace.lasttime,
				skipnum: helper.pace.skipnum,
				livemusic: helper.pace.livemusic,
				kk1: helper.kk1,
				picnum: 0,
				picpath: "../../static/icon/循环.png",
				imgk1: this.imgk,
				name1: this.name,
				ren1: this.ren,
				few1: uni.getStorageSync('few'),
				index: 1,
				geci: true,
				startk1: helper.musiclength.stare1,
				endk1: helper.musiclength.end1,
				lrc: helper.lrc,
				time: helper.pace.ketime,
				p: null,
				timenum: 0,
				timeheight: 560,
				musiclengthk: helper.musiclength.lengthk,
				musicnum: uni.getStorageSync('musiclist').length,
				listboxtitle: "随机播放",
				listboxbottom: "-70%",
				showlistboxnum: false,
				musiclistdata: uni.getStorageSync('musiclist'),
				isdel: false,
				lrcid: 0,
				musicplaylist: null,
				xian: 1,
				newpl: [],
				hotpl: [],
				ad: null
			};
		},
		// ['imgk', 'name', 'ren', 'kk'],
		props: {
			'imgk': {
				type: String,
			},
			'name': {
				type: String,
			},
			'ren': {
				type: String,
			},
			'dd': {
				type: Number,
				default: -100
			},
			'top': {
				type: [Number, String],
				default: 0
			},
			'indexk': {
				type: Number,
				default: 0
			},
			'startk': {
				type: Number,
				default: 0
			},
			'endk': {
				type: Number,
				default: 0
			},
			'musiclength': {
				type: Number,
				default: 0
			},
			'musicvalue': {
				type: Number,
				default: 0
			},
			'few': {
				type: Number,
				default: 0
			},
			'hello': {
				type: Number,
				default: 0
			},
			'playlength': {
				type: Number,
				default: 0
			},
			'isshow': {
				type: Number,
				default: 0
			},
			'startgq': {}
		},
		methods: {
			getcomments() {
				if(this.few1) {
					uni.navigateTo({
						url: `/pages/wordpage/wordpage?few=${this.few1}`
					})
				}else {
					uni.navigateTo({
						url: `/pages/wordpage/wordpage?few=0`
					})
				}
				
			},
			horplay(e) {

				helper.audiok.stop()
				let fewtime = e
				this.few1 = fewtime
				uni.setStorageSync('few', fewtime)
				let few1mus = uni.getStorageSync('musiclist')[fewtime]


				this.lasttime = 0
				this.firsttime = 0
				// helper.contminlist.musicpic = few1mus.img
				// helper.contminlist.name = few1mus.title
				// helper.contminlist.ren = few1mus.name
				helper.pace.firsttime = 0
				helper.pace.lasttime = 0
				this.imgk1 = few1mus.img
				this.live = 0
				helper.pace.visible = 0
				this.name1 = few1mus.title
				this.ren1 = few1mus.name
				this.getdata(few1mus.e)

				// helper.audiok.onCanplay(() => {
				// 	console.log(11111111)
				// })

				helper.audiok.onCanplay(() => {
					helper.musiclength.lengthk = (helper.audiok.duration) / 100
					this.musiclength = (helper.audiok.duration) / 100
					// console.log(helper.audiok.duration)

					helper.musiclength.stare1 = Math.floor((helper.audiok.duration) / 60)
					this.startk = Math.floor((helper.audiok.duration) / 60)
					helper.musiclength.end1 = Math.round((helper.audiok.duration) % 60)
					this.endk = Math.round((helper.audiok.duration) % 60)
					// console.log( helper.musiclength.stare1)
					// console.log( helper.musiclength.end1)
				})
				// this.keduoli = setInterval(() => {
				// 	if(helper.musiclength.playlength == 0) {
				// 		this.playlength += 1
				// 	}else {
				// 		// console.log(helper.musiclength.playlength,1212)
				// 		let tmp = helper.musiclength.playlength+=1
				// 		this.playlength = tmp
				// 	}
				// },1000)
				helper.audiok.onEnded(() => {
					// console.log(1111111111000000)
					if (uni.getStorageSync('musiclist') <= 1) {
						this.hello = 1
						helper.kk1 = 1
					} else {
						// console.log(this.child)
						this.child.down()
						// this.$refs.child.down()
					}

				})

				helper.audiok.onPlay(() => {
					console.log(this.musiclength)
					clearInterval(this.keduoli)
					this.keduoli = null

				})

				helper.audiok.onTimeUpdate(() => {

					// console.log(111111)

					this.musicvalue = (helper.audiok.currentTime) / this.musiclength
					helper.pace.visible = (helper.audiok.currentTime) / this.musiclength
					// console.log(helper.audiok.currentTime,2424)
					let keduoli = helper.audiok.currentTime
					// console.log(keduoli,123123)
					this.playlength = keduoli
					helper.pace.ketime = keduoli

				})
				this.colorchange()
				// console.log(e.currentTarget.dataset.in)
			},
			xiank() {
				this.$emit('xianok', this.xian)
			},
			quitdel() {
				this.isdel = false
			},
			delno() {
				this.isdel = false
			},
			yesdel() {
				this.listboxbottom = '-70%'
				this.showlistboxnum = false
				this.xian = 0
				this.isdel = false
				this.musicplaylist = ''
				// helper.audiok.stop()
				// helper.audiok.src = ''
				this.kk1 = 1
				helper.kk1 = 1
				uni.setStorageSync('kk1', 1)
				this.firsttime = 0
				helper.pace.firsttime = 0
				this.lasttime = 0
				helper.pace.lasttime = 0
				this.live = 0
				helper.pace.visible = 0
				try {
					uni.removeStorageSync('musiclist')
				} catch (e) {
					console.log(e)
				}
			},
			dellist() {
				this.isdel = true
				// uni.removeStorageSync('musiclist');
			},
			quitlist() {
				this.listboxbottom = '-70%'
				this.showlistboxnum = false
			},
			colorchange() {
				// console.log(helper.count)
				clearTimeout(this.timer)
				this.timer = null
				let fewnum = uni.getStorageSync('few')

				// this.timer()				
				this.timer = setTimeout(() => {

					let listboxmusic = document.querySelectorAll("#list")
					let listboxmusicspan = document.querySelectorAll(".singer")

					if (listboxmusic[fewnum]) {
						// console.log(helper.count, fewnum)
						if (helper.count != null) {

							listboxmusic[helper.count].style.color = ""
							listboxmusicspan[helper.count].style.color = ""

						}
						// console.log(fewnum)
						// console.log(listboxmusic[fewnum])
						listboxmusic[fewnum].style.color = "red"
						listboxmusicspan[fewnum].style.color = "red"
						// console.log(helper.count,fewnum)
						if (fewnum < 0) {
							helper.count = 0
						} else {
							helper.count = fewnum
						}
					}

				}, 200)
			},
			showlistbox() {
				this.colorchange()
				setTimeout(() => {
					let kkkk1 = document.querySelector(".minlistbox")

					if (kkkk1) {
						kkkk1.scrollTop = 0
						kkkk1.scrollTop = 50 * (this.few1)
					}
				}, 100)

				this.musicplaylist = uni.getStorageSync('musiclist')
				if (this.indexk) {
					this.listboxbottom = '110rpx'
				} else {
					this.listboxbottom = '35rpx'
				}
				this.showlistboxnum = true
			},
			shougeci() {
				this.geci = !this.geci
				// console.log(this.few1)
				if (!this.geci) {
					try {
						// console.log()
						let tmp = uni.getStorageSync('few')
						this.few1 = tmp
						// console.log(tmp)
						this.lrcid = uni.getStorageSync('musiclist')[tmp].e
						// console.log(this.lrcid)
					} catch (e) {
						console.log(e, '珂朵莉')
						this.lrcid = null
					}
					// console.log('kkkk')
					// console.log(helper.lrcid != this.lrcid)
					if (helper.lrcid != this.lrcid || this.lrc == null) {

						try {
							helper.lrcid = uni.getStorageSync('musiclist')[this.few1].e
						} catch (e) {
							console.log(e, '珂朵莉')
							//TODO handle the exception
						}

						if (this.lrcid != null) {
							// console.log(1111)
							uni.request({
								// url: `http://localhost:3000/lyric?id=${this.lrcid}`,
								url: `${helper.url}/lyric?id=${this.lrcid}`,
								success: (res) => {
									// console.log(res.data.lrc.lyric)
									this.lrc = res.data.lrc.lyric
									helper.lrc = res.data.lrc.lyric
									// console.log(111)
									if (this.lrc) {
										this.shouindex()
									}
								}
							})
						}
					} else {
						// console.log('keduoli hello',helper.lrc)
						// console.log(this.lrc)
						// console.log(this.lrc,helper.lrc)
						if (!this.lrc) {
							// console.log(11111111)
							this.lrc = helper.lrc
							console.log(this.lrc)
							this.shouindex()
						}
					}

				}
			},
			shouindex() {
				// console.log(1111111111)
				let text = (this.lrc).split("\n")

				// var time = 30
				let htmltext = ''
				let musictime = []
				for (let i = 0; i < text.length; i++) {
					if (text[i].split("]")[1]) {
						// console.log(htmltext)
						htmltext += (`<p id='geci' class='p'>${text[i].split("]")[1]}</p>`)
						let move = text[i].split('[')[1].split(']')[0].split(":")
						let fen = move[0]
						let min = move[1].split('.')[0]
						let s = move[1].split('.')[1]

						musictime.push(fen * 60 + min * 1 + s / 1000)
						// console.log(fen,min,s / 1000,11111)
					}

				}
				let con = document.querySelector(".contentk1")
				con.innerHTML = htmltext
				this.p = document.querySelectorAll('#geci')
				for (let i = 0; i < this.p.length; i++) {
					this.p[i].dataset.keduoli = musictime[i]
				}
				helper.audiok.onTimeUpdate(() => {
					this.getgeci()
					// console.log(p)
				})
			},
			getdata(id) {
				this.kk1 = 0
				helper.kk1 = 0
				this.index = 1

				uni.request({
					// url: `http://localhost:3000/song/url/v1?id=${id}&level=exhigh`,
					url: `${helper.url}/song/url/v1?id=${id}&level=exhigh`,
					success: (res) => {
						// console.log(res)
						helper.audiok.src = res.data.data[0].url
						// this.ad.src = res.data.data[0].url

						// this.startgq()
						// this.ad.onCanplay(() => {
						// 	console.log(111)
						// })
						// this.ad.onTimeUpdate(() => {
						// 	console.log(22222)
						// })
						// this.$helper.audiok.onCanplay(() => {
						// 	console.log(11111)
						// })

					}
				})



				// helper.audiok.onPlay(() => {
				// 	console.log(22222)
				// })
			},
			forward() {
				this.musiclistdata = uni.getStorageSync('musiclist')
				this.few1 = uni.getStorageSync('few')
				this.geci = true
				this.lrc = null
				helper.lrc = null
				// this.shougeci()
				if (this.few1 == 0) {
					this.few1 = this.musicnum - 1
					uni.setStorageSync('few', this.few1)
					this.imgk1 = this.musiclistdata[this.few1].img
					this.name1 = this.musiclistdata[this.few1].title
					this.ren1 = this.musiclistdata[this.few1].name
					this.getdata(this.musiclistdata[this.few1].e)
					this.lrcid = this.musiclistdata[this.few1].e
				} else if (this.few1 - 1 >= 0) {

					this.few1 -= 1
					uni.setStorageSync('few', this.few1)
					this.imgk1 = this.musiclistdata[this.few1].img
					this.name1 = this.musiclistdata[this.few1].title
					this.ren1 = this.musiclistdata[this.few1].name
					this.getdata(this.musiclistdata[this.few1].e)
					this.lrcid = this.musiclistdata[this.few1].e
				}
			},
			down() {
				// console.log(this.startk1,this.endk1,helper.musiclength.stare1)
				this.musiclistdata = uni.getStorageSync('musiclist')
				this.few1 = uni.getStorageSync('few')
				// console.log(this.few1)
				this.geci = true
				this.lrc = null
				helper.lrc = null
				// this.shougeci()
				// console.log(this.few1 < this.musicnum,this.few1)
				if (this.few1 + 1 < this.musicnum) {

					this.few1++
					// console.log(this.few1,this.musiclistdata[this.few1].title)
					uni.setStorageSync('few', this.few1)
					this.imgk1 = this.musiclistdata[this.few1].img
					this.name1 = this.musiclistdata[this.few1].title
					this.ren1 = this.musiclistdata[this.few1].name
					this.getdata(this.musiclistdata[this.few1].e)
					this.lrcid = this.musiclistdata[this.few1].e
				} else if (this.few1 + 1 >= this.musicnum) {

					this.few1 = 0
					uni.setStorageSync('few', this.few1)
					this.imgk1 = this.musiclistdata[this.few1].img
					this.name1 = this.musiclistdata[this.few1].title
					this.ren1 = this.musiclistdata[this.few1].name
					this.getdata(this.musiclistdata[this.few1].e)
					this.lrcid = this.musiclistdata[this.few1].e
				}
			},
			changepic() {
				if (this.picnum == 0) {
					this.picpath = "../../static/icon/random-forest.png"
					this.picnum = 1
					return
				} else if (this.picnum == 1) {
					this.picpath = "../../static/icon/心动.png"
					this.picnum = 2
					return
				} else {
					this.picpath = "../../static/icon/循环.png"
					this.picnum = 0
					return
				}
			},
			changeline(e) {

				this.skipnum = e.detail.value
				helper.pace.skipnum = e.detail.value
				// console.log(this.skipnum,222,helper.pace.skipnum,this.musiclengthk,2222,helper.pace.num,6666,helper.musiclength.lengthk)
				// 跳转
				// console.log(this.live,19191)
				this.live = e.detail.value
				this.livemusic = this.skipnum * (this.musiclengthk == 0 ? this.musiclength : this.musiclengthk)
				helper.pace.livemusic = helper.pace.skipnum * helper.pace.num
				helper.musiclength.playlength = Math.round(this.skipnum)
				helper.audiok.seek(this.livemusic)
				helper.audiok.play()
				this.kk1 = 0
				// console.log(this.livemusic,111,helper.pace.livemusic)
				this.skipmusic(this.livemusic)
			},
			skipmusic(livemusic) {

				if (livemusic < 60) {
					this.firsttime = 0

					helper.pace.firsttime = 0
					this.lasttime = Math.floor(livemusic)
				} else if (livemusic == 60) {
					helper.pace.firsttime = 1
					helper.pace.lasttime = 0

					this.firsttime = 1
					this.lasttime = 0
				} else if (livemusic > 60) {
					helper.pace.firsttime = parseInt(livemusic / 60)
					helper.pace.lasttime = Math.round(livemusic % 60)

					this.firsttime = parseInt(livemusic / 60)
					this.lasttime = Math.round(livemusic % 60)

					// console.log(livemusic / 60)
					// console.log(livemusic % 60)
				}
			},
			full() {
				this.geci = true

				helper.audiok.onTimeUpdate(() => {

						// console.log(1111111)
						let keduoli = helper.audiok.currentTime
						this.time = keduoli
						let time1 = Math.round(this.time)
						this.skipmusic(time1)


						this.live = (helper.audiok.currentTime) / (this.musiclengthk == 0 ? this.musiclength : this
							.musiclengthk)
						// console.log(this.musiclength)
					}),
					helper.audiok.onEnded(() => {
						// console.log(101010)
						if (this.musicnum <= 1) {
							helper.kk1 = 1
							this.kk1 = 1
						} else {
							// console.log(this)
							this.down()
						}

					})

				this.long = 0
				// uni.hideTabBar()
				if (this.isshow == 1) {
					// console.log(111)
					uni.hideTabBar()
					// this.isshow = 0
				}

			},
			setk() {
				if (this.live == 100) {
					this.live = 0
					this.lasttime = 0
					this.firsttime = 0
				}
				// console.log(this.index)
				if (this.index == 2) {
					// console.log(222)
					this.index = 1
					helper.audiok.play()
					helper.kk1 = 0
					this.kk1 = 0
				} else if (this.index == 1) {
					// console.log(111)
					this.index = 2
					helper.audiok.pause()
					helper.kk1 = 1
					this.kk1 = 1
				}

			},
			minbark() {
				// 歌词的初始高度
				this.timeheight = 560
				this.geci = true
				let stop1 = 2
				this.$emit('stopkk', stop1)
				if (this.indexk) {
					this.long = -95
				} else {
					this.long = -100
				}
			},
			getgeci() {
				// console.log(this.time)
				for (let i = 0; i < this.p.length; i++) {
					if (this.p[i].dataset.keduoli < this.time) {
						if ((i - 1) >= 0) {
							for (let j = 0; j < i; j++) {
								// console.log(j)
								this.p[j].style.color = 'rgba(255,255,255,.6)'
								this.p[j].style.fontSize = '14px'
								this.p[j].style.fontWeight = '500'
							}
						}
						this.p[i].style.color = '#fff'
						this.p[i].style.fontSize = '20px'
						this.p[i].style.fontWeight = '600'

						if (this.timenum < i) {
							this.timenum = i
							// console.log(this.timenum)
							let tp = 560
							this.timeheight = tp - (80 * this.timenum)
							// console.log(this.timeheight)
						}

					} else {
						this.p[i].style.color = 'rgba(255,255,255,.6)'
						this.p[i].style.fontWeight = '500'
					}
				}

			}
		},
		computed: {
			playUrl() {
				return this.kk1 == 0 ? this.url1 : this.url2
			},
			playfirst() {
				return '0' + this.firsttime
			},
			playlast() {
				return this.lasttime < 10 ? ('0' + this.lasttime) : this.lasttime
			},
			allfirst() {
				return '0' + this.startk1 == 0 ? this.startk : this.startk1
			},
			alllast() {
				return this.endk1 == 0 ? (this.endk < 10 ? ('0' + this.endk) : this.endk) : (this.endk1 < 10 ? ('0' + this
					.endk1) : this.endk1)
			},
			rotation() {
				return this.strnum > 10 ? ['barname', 'barnamestart'] : 'barname'
			}
			// topnumsize() {
			// 	let keduolifew = uni.getStorageSync('few')
			// 	let keduolisize = uni.getStorageSync('musiclist')[keduolifew]
			// 	console.log(keduolisize,keduolifew)
			// 	return keduolisize.size
			// }
		},
		watch: {
			top(val) {
				this.topnum = this.top
			},
			playlength() {
				this.time = this.playlength
				let time1 = Math.round(this.time)
				this.skipmusic(time1)
			},
			dd(val) {
				// console.log(this.dd)
				this.long = this.dd
				this.kk1 = 0
				this.index = 1

			},
			musicvalue(val) {
				this.live = this.musicvalue
			},
			imgk(val) {
				// console.log(111)
				this.imgk1 = this.imgk
			},
			name(val) {
				this.strnum = this.name.length
				this.name1 = this.name
			},
			ren(val) {
				this.ren1 = this.ren
			},
			hello(val) {
				if (this.hello == 0) {
					// console.log(111)
					this.kk1 = this.hello
					helper.kk1 = this.hello
					this.index = 1

					// console.log(this.index)
				} else if (this.hello == 1) {
					// console.log(this.index)
					this.kk1 = this.hello
					helper.kk1 = this.hello
					this.index = 2
					// console.log(11111111111111111)
				}
			}
		},
		startk(val) {

			this.startk1 = this.startk
		},
		emdk(val) {
			this.endk1 = this.endk
		},
		musiclength(val) {
			// console.log(val, 43434)
			this.musiclengthk = this.musiclength
			helper.pace.num = this.musiclength
		}

	}
</script>

<style lang="scss" scoped>
	.ismax {
		bottom: -100vh !important;
	}

	.t20 {
		padding: 0 5rpx;
	}

	.maxmusic {
		z-index: 99;
		position: fixed;
		left: 0;
		bottom: 0;

		// transition: all 0.01s ease-in-out;
		.musicmask {
			z-index: 10;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100vh;
			background-color: rgba(0, 0, 0, .2);
		}

		.musicbox {

			padding-right: 15rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100%;
			height: 140rpx;
			background-color: #1c1c1e;
			box-shadow: 0 -2px 2px rgba(0, 0, 0, .2);

			.listboxmask,
			.listdelmask {
				position: fixed;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				z-index: 110;
			}
			.listboxmask {
				background-color: rgba(0, 0, 0, .5);
			}

			.listdelmask {
				z-index: 130;
			}

			.listbox {
				box-sizing: border-box;
				// margin: 0 40rpx;
				padding: 0 20rpx;
				z-index: 140;
				position: fixed;
				// top: 0;
				left: 0;
				// bottom: 35rpx;
				// bottom: -70%;
				width: 100%;
				height: 70%;
				// z-index: 999;
				transition: all .3s ease-in-out;

				.minlistbox {
					overflow: auto;
					position: relative;
					// z-index: 999;
					box-sizing: border-box;
					padding: 30rpx 30rpx;
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
					background-color: var(--historybgcolor);

					.delmask {
						z-index: 200;
						box-sizing: border-box;
						padding: 40rpx 40rpx;
						position: absolute;
						top: 15%;
						left: 50%;
						transform: translateX(-50%);
						width: 85%;
						height: 25%;
						background-color: #2c2c2c;
						border-radius: 30rpx;
						color: rgba(255, 255, 255, .6);

						.delright {
							color: red;
							display: flex;
							position: absolute;
							right: 45rpx;
							bottom: 45rpx;

							.delno {
								// padding-right: 0rpx;
								margin-left: 60rpx;
							}

							.delno,
							.yesdel {
								padding: 0 20rpx;
							}
						}
					}

					.top {
						.t1 {
							color: var(--listboxfontcolor);
							margin-right: 10rpx;
							font-size: 35rpx;
							font-weight: 600;
						}

						.t2 {
							font-size: 28rpx;
							color: var(--searchlistfontcolor);
						}
					}

					.btn {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.random {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.ranicon {
								padding: 20rpx 0;
								margin-right: 10rpx;
								width: 50rpx;
								height: 50rpx;
							}

							.t3 {
								color: var(--listboxfontcolor);
								font-size: 32rpx;
							}
						}

						.downlis {
							display: flex;

							.downlist1,
							.addlist1,
							.clearlis1 {
								padding: 20rpx 0 20rpx 10rpx;
								margin-left: 35rpx;
								width: 45rpx;
								height: 45rpx;
							}
						}

					}

					.musiclist {
						// margin-top: 30rpx;
						width: 100%;

						// background-color: #333;
						.scr-list {
							padding: 25rpx 0;
							display: flex;
							justify-content: space-between;
							align-items: center;

							.scr-box {
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								width: 400rpx;
								// display: flex;
								// align-items: center;
								color: #fff;

								.name {
									font-size: 32rpx;
								}

								.singer {
									// text-overflow: ellipsis;
									font-size: 20rpx;
									color: rgba(255, 255, 255, .6);
								}

								.t4 {
									padding: 0 8rpx;
								}
							}

							.scr-clear {
								width: 28rpx;
								height: 28rpx;
							}
						}
					}
				}
			}

			.leftbox {
				display: flex;
				align-items: center;

				.leftpic {
					margin-bottom: 45rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					// padding-bottom: 20rpx;
					margin-right: 20rpx;
					// overflow: hidden;
					width: 90rpx;
					height: 90rpx;
					border: 15rpx solid #000;
					border-radius: 50%;

					.pick {
						border-radius: 50%;

					}

				}

				.title {
					width: 350rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					padding-bottom: 15rpx;
					color: #fff;

					.t18 {
						color: #fff;
						font-size: 30rpx;
						font-weight: 600;
					}

					.t17 {
						font-size: 20rpx;
						color: rgba(255, 255, 255, .4);
					}
				}
			}

			.rightbox {
				display: flex;
				align-items: center;

				.morek {
					width: 48rpx;
					height: 48rpx;
				}

				.startk {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 60rpx;
					height: 60rpx;
					text-align: center;
					margin-right: 40rpx;

					// background-color: #000;
					.startpic {
						padding-left: 4rpx;
						width: 60rpx;
						height: 60rpx;
					}
				}
			}
		}


		.musicbottom {
			overflow: hidden;
			position: relative;
			width: 750rpx;
			height: 100vh;
			background-color: #2d2d2d;

			.bgpic {
				background-size: cover;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}


			.topbar {
				position: relative;
				z-index: 99;
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 150rpx;

				// background-color: #000;
				.topmask {
					z-index: 99;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}

				.bartit {
					margin: 0 40rpx;
					overflow: hidden;
					width: 320rpx;
					z-index: 99;
					text-align: center;
					color: #fff;

					.barname {
						display: inline-block;
						white-space: nowrap;

					}

					.barnamestart {
						animation: 10s wordsLoop linear infinite normal;
					}

					.t19 {
						color: rgba(255, 255, 255, .7);
						font-size: 20rpx;
						display: block;
					}
				}

				.baricon {
					z-index: 99;
					width: 60rpx;
					height: 60rpx;
				}

				.bargive {
					z-index: 99;
					width: 50rpx;
					height: 50rpx;
				}
			}


			.center-box {
				position: relative;
				// z-index: ;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 1150rpx;

				.maskcenterbox {
					overflow: hidden;
					box-sizing: border-box;
					padding: 30rpx 20rpx 50rpx;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					// background-color: rgba(255,255,255,.4);
					background-color: transparent;
					z-index: 100;

					.boxk1 {
						overflow: hidden;
						// width: 100%;
						text-align: center;
						height: 100%;

						// background-color: #fff;
						.contentk1 {
							transition: all 0.5s linear;
							// height: 100%;
							position: relative;
							// top: 0;
							left: 0;

						}
					}
				}

				.bgpic {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					// filter: blur(20rpx);
				}

				.center-min {
					z-index: 99;
					animation: live 20s linear infinite;
					border-radius: 50%;
					// background-color: #fff;
					border: 4rpx solid #fff;

					.center-pic {
						overflow: hidden;
						border-radius: 50%;
						width: 550rpx;
						height: 550rpx;
						border: 40rpx solid rgba(255, 255, 255, 0.2);
					}
				}

			}

			.bottom-bar {
				z-index: 99;
				width: 100%;

				.play-topbar {
					z-index: 99;
					padding: 0 45rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;

					.loveicon,
					.downicon,
					.plicon,
					.moreicon {
						z-index: 99;
						width: 50rpx;
						height: 50rpx;
					}

					.plicon {
						position: relative;

						.numtop {
							position: absolute;
							top: -16rpx;
							right: -40rpx;
							font-size: 20rpx;
							color: #fff;

						}
					}
				}

				.play-linebar {
					padding: 0 35rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 150rpx;

					.time1,
					.time2 {
						z-index: 99;
						color: #fff;
						font-size: 20rpx;
					}

					.time1 {}

					.timeline {
						z-index: 99;
						width: 70%;
					}

					.time2 {}
				}

				.playbottombar {
					height: 50rpx;
					justify-content: space-around;
					align-items: center;
					display: flex;

					.toggle,
					.before,
					.stoplive,
					.after,
					.livelist {
						z-index: 99;
						width: 55rpx;
						height: 55rpx;
					}

					.toggle {
						position: relative;

						// padding: 10rpx;
						.toone {
							position: absolute;
							top: -20rpx;
							left: -20rpx;
							padding: 20rpx;
							width: 55rpx;
							height: 55rpx;
						}
					}

					.stoplive {
						width: 120rpx;
						height: 120rpx;
					}

					.livelist {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}

		}
	}

	@keyframes live {

		from {
			-webkit-transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(360deg);
		}

	}

	@keyframes wordsLoop {
		0% {
			transform: translateX(110%);
			-webkit-transform: translateX(110%);
		}

		100% {
			transform: translateX(-110%);
			-webkit-transform: translateX(-110%);
		}
	}
</style>