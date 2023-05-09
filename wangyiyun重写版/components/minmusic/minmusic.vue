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
							<view class="yesdel" @click="yesdel">
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

								<view class="scr-clear" v-if="item.name" @click.stop="oneclickdel(index)" style="padding: 10rpx;">
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
					<image :src="bgpic" mode="aspectFill" class="pick"></image>
				</view>
				<view class="title">
					<text class="t18">{{musiceTitle}}</text>-<text class="t17">{{singerName}}</text>
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
			<view class="bgpic" :style="{ backgroundImage: `url(${bgpic})` }">
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
						{{musiceTitle}}
					</view>
					<text class="t19">{{singerName}}</text>
				</view>
				<!-- 分享图标 -->
				<view class="bargive">
					<image src="/static/icon/3.1分享.png" mode="aspectFit"></image>
				</view>
			</view>

			<!-- 中心大圆图 -->
			<view class="center-box">
				<view class="maskcenterbox" @click.stop="shougeci">
					<view class="boxk1" v-show="!geci">
						<view class="contentk1" :style="`top:${timeheight}rpx`">
						</view>
					</view>
				</view>
				<!-- <view class="bgpic" :style="{ backgroundImage: `url(${imgk})` }">
				</view> -->
				<!-- 小盒子用于设置边框 -->
				<view class="center-min" :style="{animationPlayState: isplay}" v-show="geci">
					<!-- 图片 -->
					<view class="center-pic">
						<image :src="bgpic" mode="aspectFill"></image>
					</view>
				</view>

			</view>

			<!-- 底部功能 -->
			<view class="bottom-bar">
				<view class="play-topbar">
					<!-- 爱心 -->
					<view class="loveicon" @click.stop="addlist" v-if="islove">
						<image src="/static/icon/love2.png" mode="aspectFit"></image>
					</view>
					<view class="loveicon" @click.stop="addlist" v-else>
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
					<slider class="timeline" block-size="12" backgroundColor="rgba(255,255,255,.5)" :value="liveLine"
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
					<view class="stopliveLine" @click="setk">
						<image :src="playUrl" mode="aspectFit"></image>
					</view>
					<view class="after" @click="down">
						<image src="../../static/icon/下一首.png" mode="aspectFit"></image>
					</view>
					<view class="liveLinelist" @click="showlistbox">
						<image src="/static/icon/24gf-playlist.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper';
	import {mapState} from 'vuex'

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
				liveLine: 0,
				detliek: 0,
				skipnum: helper.pace.skipnum,
				liveLinemusic: 0,
				picnum: 0,
				picpath: "../../static/icon/循环.png",
				bgpic: this.imgk,
				musiceTitle: this.name,
				singerName: this.ren,
				index: 1,
				geci: true,
				lrc: null,
				time: helper.pace.ketime,
				p: null,
				timenum: 0,
				timeheight: 560,
				musicnum: uni.getStorageSync('musiclist').length,
				listboxtitle: "随机播放",
				listboxbottom: "-70%",
				showlistboxnum: false,
				musiclistdata: uni.getStorageSync('musiclist'),
				isdel: false,
				lrcid: 0,
				musicplaylist: null,
				newpl: [],
				hotpl: [],
				ad: null,
				islove: this.love
			};
		},
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
			'isshow': {
				type: Number,
				default: 0
			},
			'love': {
				type: Boolean,
				default: false
			},
			'startgq': {}
		},

		methods: {
			setlove(id, msg) {
				let key = uni.getStorageSync('cookie')
				let sta
				if(msg) {
					sta = "添加为喜欢"
				}else {
					sta = "取消喜欢"
				}
				uni.request({
					url: `${helper.url}/like?id=${id}&like=${msg}&timestamp=${Date.now()}`,
					data: {
						cookie: key
					},
					success: (res) => {
						uni.showToast({
							title: sta,
							duration: 1000,
							mask: true,
							icon: 'none'
						});
						console.log(res)
					}
				})
				
				uni.removeStorageSync('musiceid')
			},
			addlist() {
				let onemusice = uni.getStorageSync('musiclist')
				let keduoli = onemusice[this.changemusic]
				let id = keduoli.e
				try{
					if(this.islove) {
						keduoli.love = false
						
						this.islove = false
						helper.contminlist.islove = false
						uni.setStorageSync('musiclist', onemusice)
						this.setlove(id, false)
					}else {
						keduoli.love = true
						this.islove = true
						helper.contminlist.islove = true
						uni.setStorageSync('musiclist', onemusice)
						this.setlove(id, true)
					}
				}catch(e){
					console.log('珂朵莉')
				}
			},
			oneclickdel(e) {
				// let tmp = e + 1
				let arr = uni.getStorageSync('musiclist')
				arr.splice(e, 1)
				this.musicplaylist = arr
				uni.setStorageSync('musiclist',arr)
				let arr1 = uni.getStorageSync('musiclist')
				if(arr1.length > 0) {
					if(e < arr1.length) {
						// this.$store.commit('changeSubscript', e + 1)
						// helper.count = e + 1
						// this.down()
						this.colorchange()
					}else if(e === arr1.length) {
						this.$store.commit('changeSubscript', -1)
						helper.count = -1
						this.down()
						this.colorchange()
					}
 				}else if(arr1.length <= 0) {
					helper.audiok.src = ''
					this.showlistboxnum = false
					this.listboxbottom = '-70%'
					this.$store.commit('changeshow', 0)
				}
				
			},
			// 获取当前播放歌曲的评论
			getcomments() {
				let subscript = this.musicSubscript
				if (subscript >= 0) {
					uni.navigateTo({
						url: `/pages/wordpage/wordpage?few=${subscript}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/wordpage/wordpage?few=0`
					})
				}
			},
			horplay(e) {
				
				// helper.audiok.stop()
				// 存入当前播放的下标

				this.$store.commit('changeSubscript', e)
				// console.log(this.$store.state.musicSubscript)
				// // 获取当前播放音乐的相关信息
				let musiceDetail = uni.getStorageSync('musiclist')[e]


				this.getdata(musiceDetail.e)
				
				this.colorchange()

			},
			quitdel() {
				this.isdel = false
			},
			delno() {
				this.isdel = false
			},
			// 删除搜索历史记录
			yesdel() {
				this.listboxbottom = '-70%'
				this.showlistboxnum = false
				this.$store.commit('changeshow', 0)
				this.isdel = false
				this.musicplaylist = ''

				this.$store.commit('changeControl', 1)
				this.$store.commit('changefirsttime', 0)
				this.$store.commit('changelasttime', 0)
				this.liveLine = 0
				helper.pace.liveLine = 0
				try {
					uni.removeStorageSync('musiclist')
				} catch (e) {
					console.log(e)
				}
			},
			dellist() {
				this.isdel = true
			},
			quitlist() {
				this.listboxbottom = '-70%'
				this.showlistboxnum = false
			},
			colorchange() {
				clearTimeout(this.timer)
				this.timer = null
				let fewnum = this.musicSubscript

				this.timer = setTimeout(() => {

					let listboxmusic = document.querySelectorAll("#list")
					let listboxmusicspan = document.querySelectorAll(".singer")

					if (listboxmusic[fewnum]) {
						if (helper.count != null) {
							if(listboxmusic[helper.count]) {
							listboxmusic[helper.count].style.color = ""
							listboxmusicspan[helper.count].style.color = ""
							}
						}
						listboxmusic[fewnum].style.color = "red"
						listboxmusicspan[fewnum].style.color = "red"
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
					let minlistbox = document.querySelector(".minlistbox")

					if (minlistbox) {
						minlistbox.scrollTop = 0
						minlistbox.scrollTop = 50 * (this.musicSubscript)
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
				if (!this.geci) {
					
					try {
						this.lrcid = uni.getStorageSync('musiclist')[this.musicSubscript].e
						// console.log(this.lrcid)
					} catch (e) {
						console.log(e, '珂朵莉')
						this.lrcid = null
					}
					if (helper.lrcid != this.lrcid || this.lrc == null) {
						try {
							helper.lrcid = uni.getStorageSync('musiclist')[this.musicSubscript].e
						} catch (e) {
							console.log(e, '珂朵莉')
						}

						if (this.lrcid != null) {
							uni.request({
								url: `${helper.url}/lyric?id=${this.lrcid}`,
								success: (res) => {
									this.lrc = res.data.lrc.lyric
									helper.lrc = res.data.lrc.lyric
									if (this.lrc) {
										this.shouindex()
									}
								}
							})
						}
					} else {
						if (!this.lrc) {
							console.log(helper.lrc, 111)
							this.lrc = helper.lrc
							this.shouindex()
						}
					}

				}
			},
			shouindex() {
				let text = (this.lrc).split("\n")

				let htmltext = ''
				let musictime = []
				for (let i = 0; i < text.length; i++) {
					if (text[i].split("]")[1]) {
						htmltext += (`<p id='geci' class='p'>${text[i].split("]")[1]}</p>`)
						let move = text[i].split('[')[1].split(']')[0].split(":")
						let fen = move[0]
						let min = move[1].split('.')[0]
						let s = move[1].split('.')[1]

						musictime.push(fen * 60 + min * 1 + s / 1000)
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
				})
			},
			getdata(id) {
				this.$store.commit('changeControl', 0)
				this.index = 1

				uni.request({
					url: `${helper.url}/song/url/v1?id=${id}&level=exhigh`,
					success: (res) => {
						helper.audiok.src = res.data.data[0].url
						
						
					}
				})

			},
			forward() {
				this.musiclistdata = uni.getStorageSync('musiclist')
				let sub = this.musicSubscript
				this.timeheight = 560
				this.geci = true
				this.lrc = null
				helper.lrc = null
				// this.shougeci()
				if (sub <= 0) {
					sub = this.musiclistdata.length - 1
					this.$store.commit('changeSubscript', this.musiclistdata.length - 1)
					this.bgpic = this.musiclistdata[sub].img
					this.musiceTitle = this.musiclistdata[sub].title
					this.islove = this.musiclistdata[sub].love
					this.singerName = this.musiclistdata[sub].name
					this.getdata(this.musiclistdata[sub].e)
					this.lrcid = this.musiclistdata[sub].e
				} else if (sub - 1 >= 0) {
					sub -= 1
					this.$store.commit('changeSubscript', sub)
					this.bgpic = this.musiclistdata[sub].img
					this.musiceTitle = this.musiclistdata[sub].title
					this.islove = this.musiclistdata[sub].love
					this.singerName = this.musiclistdata[sub].name
					this.getdata(this.musiclistdata[sub].e)
					this.lrcid = this.musiclistdata[sub].e
				}
			},
			down() {
				this.timeheight = 560
				this.musiclistdata = uni.getStorageSync('musiclist')
				let sub = this.musicSubscript
				this.geci = true
				this.lrc = null
				helper.lrc = null

				if (sub < this.musiclistdata.length - 1) {
					sub += 1
					this.$store.commit('changeSubscript', sub)
					this.bgpic = this.musiclistdata[sub].img
					this.musiceTitle = this.musiclistdata[sub].title
					this.islove = this.musiclistdata[sub].love
					this.singerName = this.musiclistdata[sub].name
					this.getdata(this.musiclistdata[sub].e)
					this.lrcid = this.musiclistdata[sub].e
				} else if (sub + 1 >= this.musiclistdata.length) {

					sub = 0
					this.$store.commit('changeSubscript', 0)
					this.bgpic = this.musiclistdata[sub].img
					this.musiceTitle = this.musiclistdata[sub].title
					this.islove = this.musiclistdata[sub].love
					this.singerName = this.musiclistdata[sub].name
					this.getdata(this.musiclistdata[sub].e)
					this.lrcid = this.musiclistdata[sub].e
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

				this.liveLine = e.detail.value
				this.liveLinemusic = this.skipnum * this.globalmusicePercentage

				helper.audiok.seek(this.liveLinemusic)
				helper.audiok.play()
				this.$store.commit('changeControl', 0)
				// console.log(this.liveLinemusic,111,helper.pace.liveLinemusic)
				this.skipmusic(this.liveLinemusic)
			},
			skipmusic(liveLinemusic) {

				// console.log(liveLinemusic)
				if (liveLinemusic < 60) {
					this.$store.commit('changefirsttime', 0)

					this.$store.commit('changelasttime', Math.floor(liveLinemusic))
					// this.lasttime = Math.floor(liveLinemusic)
					// console.log(this.lasttime)
				} else if (liveLinemusic == 60) {
					this.$store.commit('changefirsttime', 1)
					// this.firsttime = 1
					this.$store.commit('changelasttime', 0)
					// this.lasttime = 0
				} else if (liveLinemusic > 60) {
					this.$store.commit('changefirsttime', parseInt(liveLinemusic / 60))

					this.$store.commit('changelasttime', Math.round(liveLinemusic % 60))


					// this.firsttime = parseInt(liveLinemusic / 60)
					// this.lasttime = Math.round(liveLinemusic % 60)

					// console.log(liveLinemusic / 60)
					// console.log(liveLinemusic % 60)
				}
			},
			full() {
				this.geci = true

				this.long = 0
				if (this.isshow == 1) {
					uni.hideTabBar()
				}

			},
			setk() {
				if (this.liveLine == 100) {
					this.liveLine = 0
					helper.pace.liveLine = 0
					this.$store.commit('changefirsttime', 0)
					this.$store.commit('changelasttime', 0)
				}
				// console.log(this.index)
				if (this.index == 2) {
					// console.log(222)
					this.index = 1
					helper.audiok.play()
					this.$store.commit('changeControl', 0)
				} else if (this.index == 1) {
					// console.log(111)
					this.index = 2
					helper.audiok.pause()
					this.$store.commit('changeControl', 1)
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
				// console.log(this.musiceplaylength)
				for (let i = 0; i < this.p.length; i++) {
					if (this.p[i].dataset.keduoli < this.musiceplaylength) {
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
				return this.controlPlayAndStop == 0 ? this.url1 : this.url2
			},
			playfirst() {
				return '0' + this.firsttime
			},
			playlast() {
				return this.lasttime < 10 ? ('0' + this.lasttime) : this.lasttime
			},
			allfirst() {
				return '0' + this.globalmusiceminute
			},
			alllast() {
				return this.globalmusicesecond < 10 ? ('0' + this.globalmusicesecond) : this.globalmusicesecond
			},
			rotation() {
				return this.strnum > 10 ? ['barname', 'barnamestart'] : 'barname'
			},
			isplay() {
				return this.controlPlayAndStop == 0 ? 'running' : 'paused'
			},
			changemusic() {
				return this.musicSubscript
			},
			changemusiceplaylength() {
				return this.musiceplaylength
			},
			...mapState(['controlPlayAndStop', 'musicSubscript', 'globalmusicePercentage', 'globalmusiceminute', 'globalmusicesecond', 'firsttime', 'lasttime', 'musiceplaylength', 'musiceProgress']),

		},
		watch: {
			love(val) {
				this.islove = val
			},
			changemusiceplaylength(val) {
				this.skipmusic(val)
				this.liveLine = this.musiceProgress
			},
			top(val) {
				this.topnum = this.top
			},
			dd(val) {
				// console.log(this.dd)
				this.long = this.dd
				this.$store.commit('changeControl', 0)
				this.index = 1

			},
			imgk(val) {
				// console.log(111)
				this.bgpic = this.imgk
			},
			name(val) {
				this.strnum = this.name.length
				this.musiceTitle = this.name
			},
			ren(val) {
				this.singerName = this.ren
			},
			changemusic(val) {
				let row = uni.getStorageSync('musiclist')[val]
				this.musiceTitle = row.title
				this.islove = row.love
				this.singerName = row.name
				this.bgpic = row.img

				helper.contminlist.musicpic = row.img
				helper.contminlist.name = row.title
				helper.contminlist.ren = row.name
				helper.contminlist.islove = row.love

				getApp().watchmusice()

			}
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
					animation: liveLine 20s linear infinite;
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
					.stopliveLine,
					.after,
					.liveLinelist {
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

					.stopliveLine {
						width: 120rpx;
						height: 120rpx;
					}

					.liveLinelist {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}

		}
	}

	@keyframes liveLine {

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