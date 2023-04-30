<template>
	<view class="contmin night">

		<view class="box-center">
			<view class="cont-top">
				<text class="t11">单曲</text>
				
				<view class="cont-btn">
					<view class="btn-img">
						<image src="../../static/icon/播放5.png" mode="aspectFit"></image>
					</view>
					<text class="t12">播放</text>
				</view>
			</view>
			
			<view class="row" v-for="item in back" :key="item.id" @click="startgq(item.id,item.al.picUrl,item.name,item.ar[0].name, topnum)">
				<view class="row-left">
					<view class="row-tit">
						<text class="t13">{{item.name}}</text>
					</view>
					<view class="row-center">
						{{item.ar[0].name}} - {{item.al.name}}
					</view>
					<view class="row-about">
						{{item.alia[0]}}
					</view>
				</view>
				
				<view class="row-right">
					<view class="play-mv" @click.stop="getvideo(item.id,item.name)">
						<image src="../../static/icon/播放5.png" mode="aspectFit"></image>
					</view>
					<view class="row-all">
						<image src="/static/icon/更多1.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			
		</view>
		
		
		<view class="box-center mar">
			<view class="cont-top mar-cont-top mar-left">
				<text class="t11" >歌单</text>
				
			</view>
			
			<view class="row mar-row" v-for="item in arr" :key="item.id">
				<view class="row-left row-flex">
					<view class="row-tit">
						<view class="row-pic">
							<image :src="item.coverImgUrl" mode="aspectFill"></image>
						</view>
					</view>
					<view class="row-center">
						<view class="t14">
							{{item.name}}
						</view>
						<view class="t15">
							{{item.trackCount}}首, {{item.creator.nickname}}, 播放{{fillters(item.playCount)}}万次
						</view>
					</view>
			
				</view>
					
			</view>
			

		</view>
		
		<minmusic  v-show="xian"
		:imgk="musicpic" 
		:name="name" 
		:ren="ren" 
		:dd="dd"
		:top="topnum"
		:startk="startk"
		:endk="endk"
		:musiclength="musiclength"
		:musicvalue="musicvalue"
		:few="few"
		:playlength="playlength"
		:hello="hello"
		@stop="okstop"
		@stopkk="bilibili"
		@xianok="okxian"
		@getmusic="startgq"
		ref="child"></minmusic>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	import minmusic from '../../components/minmusic/minmusic.vue'
	export default {
		name:"contmin",
		data() {
			return {
				musicpic: helper.contminlist.musicpic,
				name: helper.contminlist.name,
				ren: helper.contminlist.ren,
				dd: helper.contminlist.dd,
				num: 1,
				xian: helper.contminlist.xian,
				topnum: helper.plnumstr,
				startk: 0,
				endk: 0,
				musiclength: 0,
				playlength: 0,
				musicvalue: 0,
				few: 0,
				hello: 0,
				id: null,
				child: null
				
			};
		},
		props: {
			back: {
				type: Array,
				default() {
					return []
				}
			},
			arr: {
				type: Array,
				default() {
					return []
				}
			},
			title: {
				typeof: String,
				default() {
					return '珂朵莉'
				}
			}
		},
		methods: {
			getvideo(id,name) {
				uni.reLaunch({
					url: `/pages/video/video?id=${id}&index=2&title=${name}`
				})
			},
			okxian(e) {
				this.xian = e
				helper.contminlist.xian = e
			},
			stormusiclist(e, img, title, name, size) {
				let value = uni.getStorageSync('musiclist');
				let np = false
				
				if(value != '') {
					let kenum = value.findIndex(function(item) {
						return item.e === e
					})
					if(kenum >= 0) {
						this.few = kenum
						uni.setStorageSync("few", kenum)
					}else if(kenum <= 0) {
						this.few = 0
						uni.setStorageSync("few", 0)
					}
				}
					
				if(value.length > 0) {
					let keke = value.filter((item) => {
						return item.e == e
					})
					if(keke.length == 0) {
						np = true
					}else {
						np = false
					}
				}else if(value === '') {
					// console.log(222222222222222)
					uni.setStorageSync('musiclist', [{
						e,
						title,
						name,
						img,
						size
					}])
				
				}
				
				if(np) {
					// console.log(np)
					let tp = value
					tp.unshift({
						e,
						title,
						name,
						img,
						size
					})
					// console.log(tp)
					uni.setStorageSync('musiclist', tp);
				}
			},
			startgq(k,img, n, re,size) {
				this.id = k
				helper.moredetail.push({
					"name": n,
					"singer": re
				})
				this.hello = 0
				helper.kk1 = 0
				uni.request({
					url: `${helper.url}/comment/music?id=${k}&limit=1`,
					success: (res) => {
						// console.log(res)
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
						this.stormusiclist(k, img, n, re, this.topnum)
					}
				})
				// if(helper.musiclist == '') {
				// 	// uni.setStorageSync('musiclist',[k])
				// 	helper.musiclist.unshift(k)
				// }else if(helper.musiclist.indexOf(k) == -1) {
				// 	// console.log(value)
				// 	// uni.setStorageSync('musiclist',value.unshift(k))
				// 	helper.musiclist.unshift(k)
				// 	// this.few = value.indexOf(k)
				// 	this.few = helper.musiclist.indexOf(k)
				// }else {
				// 	helper.musiclist.splice(helper.musiclist, 1)
				// 	helper.musiclist.splice(helper.musiclist.indexOf(k), 1)
				// 	// uni.setStorageSync('musiclist',value.unshift(k))
				// 	helper.musiclist.unshift(k)
				// }
				// console.log(k)
				// console.log(helper.musiclist,11111)
				// console.log(helper.musiclist.indexOf(k))
				// console.log(helper.musiclist)
				uni.request({
					// url: `http://localhost:3000/song/url/v1?id=${k}&level=exhigh`,
					url: `${helper.url}/song/url/v1?id=${k}&level=exhigh`,
					success: (res) => {
						let sizek = res.data.data[0].br
						if(sizek < 10000) {
							this.topnum = sizek
							helper.plnumstr = sizek
						}else if(sizek > 10000 || sizek < 100000) {
							this.topnum = '1w+'
							helper.plnumstr = '1w+'
						}else if(sizek > 100000) {
							this.topnum = '10w+'
							helper.plnumstr = '10w+'
						}
						
						// console.log(this.topnum)
						this.musicpic = img
						helper.contminlist.musicpic = img
						
						this.name = n
						helper.contminlist.name = n
						
						this.ren = re
						helper.contminlist.ren = re
						
						// this.$paper.ch = true
						
						this.dd = 0
						helper.contminlist.dd = 0
						
						this.xian = 1
						helper.contminlist.xian = 1
						
						// console.log('1',res.data.data[0].url)
						helper.audiok.autoplay = true
						helper.audiok.src = res.data.data[0].url
						
						
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
								  	if(uni.getStorageSync('musiclist') <= 1) {
										this.hello = 1
										helper.kk1 = 1
									}else {
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
						
					}
				})

			},
			bilibili(e) {
				if(this.num != e) {
					this.num = 1
					this.dd = -100
					helper.contminlist.dd = -100
					// console.log(11,'k')
				} else {
					// console.log(11,'k1')
					this.num = e
					this.dd = 0
					helper.contminlist.dd = 0
				}
			},
			// okstop(e) {
			// 	console.log(e)
			// 	if(this.kk != e) {
			// 		helper.audiok.pause()
			// 		this.kk = e
			// 		helper.contminlist.kk = e
			// 	} else {
			// 		helper.audiok.play()
			// 		this.kk = 0
			// 		helper.contminlist.kk = 0
			// 	}

			// },
			fillters(e) {
				let s = e /10000
				// let value = this.getBit(s)
				
				let str = Number(s);
				str = str.toFixed(2)

				return str
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.child = this.$refs.child
			})
		}
	
	}
</script>

<style lang="scss" scoped>
	.contmin {
		.box-center {
			margin: 0 20rpx;
			padding: 30rpx 25rpx;
			padding-bottom: 25rpx;
			background-color: var(--listboxbgcolor);
			border-radius: 14rpx;
			
			.cont-top {
				padding-bottom: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid var(--listboxline);
				.t11 {
					font-size: 40rpx;
					font-weight: 700;
					color: var(--listboxfontcolor);
				}
				
				.cont-btn {
					display: flex;
					justify-content: center;
					// align-items: center;
					padding: 8rpx 15rpx;
					// background-color: #fff;
					border: 1px solid var(--bordercolor);
					border-radius: 20rpx;
					.btn-img {
						vertical-align: middle;
						width: 25rpx;
						height: 25rpx;
					}
					.t12 {
						color: var(--indexfontcolor);
						padding-left: 5rpx;
						font-size: 30rpx;
					}
				}
			}
			
			.row {
				padding: 20rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid var(--listboxline);
				.row-left {
					.row-tit {
						
						.t13 {
							color: var(--listboxtextcolor);
							font-size: 35rpx;
							font-weight: 550;
							
						}	
	
					}
					.row-center,
					.row-about{
						color: var(--listboxrowcolor);
					}
				}
				
				.row-right {
					display: flex;
					align-items: center;
					.play-mv {
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 5rpx 8rpx;
						width: 30rpx;
						height: 30rpx;
						border: 1px solid #787271;
						border-radius: 15rpx;
					}
					.row-all {
						padding-left: 10rpx;
						width: 50rpx;
						height: 50rpx;
						// transform: rotate(90deg);
					}
		
				}
			}
			
		}
			
		.mar {
			margin-top: 40rpx;
			padding-bottom: 100rpx;
			
			.mar-cont-top {
				border-bottom: 0;
			}
			.mar-row {
				padding: 8rpx 0 20rpx;
				border-bottom: 0;
				
				.row-flex {
					display: flex;
					justify-content: ccenter;
					align-items: center;
					.row-tit {
						display: flex;
						justify-content: center;
						align-items: center;
						
						.row-pic {
							overflow: hidden;
							margin-right: 40rpx;
							width: 120rpx;
							height: 120rpx;
							// background-color: #fff;
							border-radius: 30rpx;
						}
						
					}
					.row-center {
						.t14 {
							color: var(--listboxfontcolor);
							font-weight: 600;
							width: 500rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						.t15 {
							color: var(--searchlistfontcolor);
							font-size: 24rpx;
						}
					}
				}
			}
		}
		
		.car {
			margin-bottom: 40rpx;
			
			.car-text {
				font-size: 24rpx;
			}
		}
		
	}
</style>