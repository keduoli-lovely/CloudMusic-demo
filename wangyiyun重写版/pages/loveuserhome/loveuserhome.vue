<template>
	<view class="love" @touchmove="move">
		<view class="bg">

		</view>
		<view class="header-bg">
			<image :src="ispic ? avatar : backpic" mode="widthFix"></image>
		</view>
		<view class="header" :class="isbg==true ? 'avtbg' : ''">
			<view class="header-left" @click="back">
				<image src="/static/icon/系统返回2.png" mode="aspectFit"></image>
			</view>

			<view class="header-right">
				<image src="/static/icon/Android更多.png" mode="aspectFit"></image>
			</view>


		</view>


		<view class="about">
			<view class="top">
				<view class="topbox">
					<view class="pic" v-if="!ispic">
						<view class="picbox">
							
							<view class="Pendants">
								<image src="/static/img/109951164255589642.jpg" mode="aspectFill"></image>
							</view>						
							<view class="img-tit">
								<image :src="avatar" mode="aspectFill"></image>
							</view>
						</view>
						
					</view>
					<view class="name">
						{{lovename}}
						<view class="wyy" v-if="identify">
							<image src="/static/img/wyy.png" mode="heightFix"></image>
						</view>
						<view class="vip" v-if="identify">
							<image src="/static/img/2.png" mode="heightFix"></image>
						</view>
					</view>
					<view class="livenum">
						<text class="t1">{{livefollowCnt}} 关注</text>
						<text class="t2">{{livefancntW}}万 粉丝</text>
						<text class="t3">Lv.8</text>
					</view>
					<view class="detail">
						{{identify}}
					</view>
					<view class="box">
						<view class="focus" :class="isfollowDay == '已关注' ? '' : 'atvred'" @click="liveuser(id)">
							{{isfollowDay}}
						</view>
					
						<view class="chat" v-if="isfollowDay == '已关注'">
							聊天
						</view>
					
						<view class="more">
							<view class="more-icon">
								<image src="/static/icon/返回4.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
					
					<view class="else">
						<view class="tarbar">
							<view class="home" v-for="(item, i) in tarbar" :key="i">
								{{item}}
							</view>
						</view>
					
						<!-- // 组件 -->
					<liveuserhome></liveuserhome>
					
					</view>
				</view>
			</view>


			
		</view>
		
		<minmusic
		v-show="$store.state.showplaycomponent" 
		:imgk="musicpic" 
		:name="name" 
		:ren="ren" 
		:dd="dd" 
		:love="love"
		:top="topnum"
		:islovehome="islovehome"
		@stopkk="bilibili"
		ref="child"
		></minmusic>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	import {mapState} from 'vuex'
	import nullFn from '../../utils/nullFn.js'
	export default {
		data() {
			return {
				islovehome: 1,
				musicpic: helper.contminlist.musicpic,
				name: helper.contminlist.name,
				ren: helper.contminlist.ren,
				topnum: helper.contminlist.topnum,
				love: helper.contminlist.islove,
				dd: helper.contminlist.dd,
				tarbar: ['主页', '歌曲', '专辑', '动态', '视频'],
				identify: '',
				isbg: false,
				backpic: '',
				livefancnt: 0,
				livefollowCnt: 0,
				isfollowDay: '关注',
				ispic: false,
				id: ''
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getlivedetail(e.id)
			this.userhomefenshi(e.id)
			
		},
		mounted() {
			uni.$on('sendlivehome', this.keduoli)
		},
		methods: {
			liveuser(e) {
				let key = uni.getStorageSync('cookie')
				if(this.isfollowDay == '关注') {
					this.getliveguanzhu(e, key, 1)
				}else {
					this.getliveguanzhu(e, key, 0)
				}
			},
			
			getliveguanzhu(id, key, state) {
				uni.request({
					url: `${helper.url}/follow?id=${id}&t=${state}`,
					data: {
						cookie: key
					},
					success: (res) => {
						console.log(res)
						if(res.data.code == 200) {
							uni.showToast({
								title: '关注成功',
								duration: 1000,
								icon:'none',
								mask:true
							});
						}else {
							uni.showToast({
								title: '关注失败',
								duration: 1000,
								icon:'none',
								mask:true
							});
						}
					}
				})
			},
			userhomefenshi(id) {
				uni.request({
					url: `${helper.url}/artist/follow/count?id=${id}`,
					success: (res) => {
						console.log(res)
						this.livefancnt = res.data.data.fansCnt
						this.livefollowCnt = res.data.data.followCnt
						this.isfollowDay = res.data.data.followDay
						
					}
				})
			},
			keduoli(e) {
				this.startgq(e.id, e.pic, e.title, e.name)
			},
			move(e) {
				let x =document.documentElement.scrollTop
				if(x > 130) {
					this.isbg = true
				}else if(x < 130) {
					this.isbg = false
				}
			},
			setiden(e) {
				this.identify = e
			},
			getlivedetail(id) {
					this.getlovemusicehot(id)
					uni.request({
						url: `${helper.url}/artist/detail?id=${id}`,
						success: (res) => {
							this.$store.commit('changesecondaryExpertIdentiy', res.data.data.secondaryExpertIdentiy)
							try{
								this.backpic = res.data.data.user.backgroundUrl
							}catch(e){
								this.ispic = true
							}
							this.$store.commit('changebriefDesc', res.data.data.artist.briefDesc)
							
							this.$store.commit('changelovename', res.data.data.artist.name)
							this.$store.commit('changeavatar', res.data.data.artist.avatar)
							this.iswyy = (res.data.data.artist.identifyTag == null ? '' : res.data.data.artist.identifyTag[0])
			
							helper.userbaike.iswyy = this.iswyy
							try{
								this.identify = res.data.data.identify.imageDesc
							}catch(e){
								this.identify = ''
							}
							
						}
					})
				},
				getlovemusicehot(id) {
					uni.request({
						url: `${helper.url}/artist/top/song?id=${id}`,
						success: (res) => {
							this.$store.commit('changeuserhomemusice', res.data.songs)
							
						}
					})
					
				},
			back() {
				uni.reLaunch({
					url: '/pages/concern/concern'
				})
			},
			stormusiclist(e, img, title, name, size, love) {
				let value = uni.getStorageSync('musiclist');
				let np = false
				if (value) {
					let kenum = value.findIndex(function(item) {
						return item.e === e
					})
					if (kenum >= 0) {
						this.$store.commit('changeSubscript', kenum)
					} else if (kenum <= 0) {
						this.$store.commit('changeSubscript', 0)
					}
				}
			
				if (value.length > 0) {
					let keke = value.filter((item) => {
						return item.e == e
					})
					if (keke.length == 0) {
						np = true
					} else {
						np = false
					}
				} else if (!value || value.length === 0) {
					uni.setStorageSync('musiclist', [{
						e,
						title,
						name,
						img,
						size,
						love
					}])
			
				}
			
				if (np) {
					let tp = value
					tp.unshift({
						e,
						title,
						name,
						img,
						size,
						love
					})
					uni.setStorageSync('musiclist', tp);
				}
			},
			islove(id) {
				let idlist = uni.getStorageSync('userliveid')
				let x
				if (idlist) {
					x = idlist.some(item => {
						return item === id
					})
				}
				return x
			},
			startgq(id, img, title, name) {
				uni.request({
					url: `${helper.url}/check/music?id=${id}`,
					success: (res) => {
						this.isplay = res.data.success
			
			
						if (!this.isplay) {
							uni.showToast({
								title: res.data.message,
								duration: 1000,
								mask: true,
								icon: 'none'
							});
							return
						}
						getApp().watchmusice()
			
						this.love = this.islove(id)
						helper.contminlist.islove = this.love
						helper.audiok.onEnded(() => {
							if (uni.getStorageSync('musiclist').length <= 1) {
								helper.audiok.src = ''
								this.$store.commit('changeControl', 1)
							} else {
								if(this.$refs.child != undefined) {
									this.$refs.child.down()
									
								}else {
									uni.$emit('lovedown')
								}
								
							}
						})
						this.id = id
						helper.moredetail.push({
							"name": title,
							"singer": name
						})
						this.hello = 0
			
						this.$store.commit('changeControl', 0)
						uni.request({
							url: `${helper.url}/comment/music?id=${id}&limit=1`,
							success: (res) => {
								let sizek = res.data.total
								if (sizek < 10000) {
									this.topnum = '999+'
									helper.plnumstr = '999+'
								} else if (sizek >= 10000 && sizek < 100000) {
									this.topnum = '1w+'
									helper.plnumstr = '1w+'
								} else if (sizek > 100000) {
			
									this.topnum = '10w+'
									helper.plnumstr = '10w+'
								}
								this.stormusiclist(id, img, title, name, this.topnum, this.love)
							}
						})
			
						uni.request({
							url: `${helper.url}/song/url/v1?id=${id}&level=exhigh`,
							success: (res) => {
			
								this.musicpic = img
								helper.contminlist.musicpic = img
			
								this.name = title
								helper.contminlist.name = title
			
								this.ren = name
								helper.contminlist.ren = name
			
			
								this.dd = 0
								helper.contminlist.dd = 0
			
								this.$store.commit('changeshow', 1)
			
								helper.audiok.autoplay = true
								helper.audiok.src = res.data.data[0].url
			
							}
						})
					}
				})
			},
			bilibili(e) {
				nullFn(false, -100, this)
				this.dd = this.$store.state.showandnone
			}
		},
		beforeDestroy() {
			uni.$off('sendlivehome')
		},
		computed: {
			...mapState(['lovename', 'avatar']),
			livefancntW() {
				return (this.livefancnt / 10000).toFixed(1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		box-sizing: border-box;
	}

	.love {
		width: 100%;
		.header-bg {
			opacity: .8;
			// height: 50%;
		}
		.avtbg {
			transition: all .9s ease;
			background-color: #151515;
		}
		.header {
			z-index: 99;
			padding: 30rpx 20rpx;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 140rpx;

			.header-left,
			.header-right {
				z-index: 5;
				width: 50rpx;
				height: 50rpx;
			}

		}

		.bg {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #151515;
		}

		.about {
			position: relative;
			.top {
				position: absolute;
				top: -50rpx;
				left: 3%;
				width: 94%;
				// height: 400rpx;
				background-color: #000;
				opacity: .8;
				border-radius: 14rpx;
				.topbox {
					position: relative;
					width: 100%;
					height: 100%;
					.pic {
						position: absolute;
						top: -90rpx;
						left: 50%;
						transform: translateX(-50%);
						width: 140rpx;
						height: 140rpx;
						// overflow: hidden;
						.picbox {
							position: relative;
							width: 100%;
							height: 100%;
							.Pendants {
								z-index: 5;
								top: -35rpx;
								left: 50%;
								transform: translateX(-50%);
								position: absolute;
								width: 145%;
								height: 145%;
							}
							.img-tit {
								position: absolute;
								overflow: hidden;
								border-radius: 50%;
								width: 100%;
								height: 100%;
							}
						}
					}
					
					.name {
						display: flex;
						justify-content: center;
						align-items: center;
						padding-top: 80rpx;
						color: #fff;
						font-weight: 550;
						font-size: 38rpx;
						text-align: center;
						.wyy {
							margin: 0 20rpx;
							height: 45rpx;
							vertical-align: middle;
						}
						.vip {
							height: 40rpx;
						}
					}
					
					.livenum,
					.detail,
					.box {
						margin-top: 20rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #666;
						font-size: 28rpx;
						.t2 {
							margin: 0 30rpx;
						}
					}
					
					.box {
						border-bottom: 1rpx solid #666;
						padding-bottom: 50rpx;
						.focus {
							background-color: #333;
						}
						.atvred {
							background-color: red;
						}
						.focus,
						.chat {
							padding: 6rpx 45rpx;
							// background-color: #fff;
							border-radius: 40rpx;
							border: 1rpx solid #666;
							color: #fff;
						}
						.chat {
							margin: 0 20rpx;
						}
						.more {
							display: flex;
							justify-content: center;
							align-items: center;
							padding: 15rpx;
							width: 55rpx;
							height: 55rpx;
							border: 1rpx solid #666;
							border-radius: 50%;
							.more-icon {
								width: 40rpx;
								height: 40rpx;
							}
						}
					}
					
					.else {
						margin-top: 160rpx;
						.tarbar {
							padding-bottom: 35rpx;
							color: #fff;
							display: flex;
							justify-content: space-around;
						}
					}
				}
				
			}
		}

	}
</style>