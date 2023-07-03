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
			
			<view class="row" v-for="(item, index) in musicdata" :key="index" @click="startgq(item.id,item.al.picUrl,item.name,item.ar[0].name, topnum)">
				<view class="row-left">
					
					<view class="row-tit">
						<text class="t13">{{item.name}}</text>
					</view>
						<view class="row-center">
							{{item.ar[0].name}} - {{item.al.name}}
							{{item.alia[0]}}
						</view>
				</view>
				
				<view class="row-right">
					<view class="play-mv" @click.stop="getvideo(item.id,item.name)" v-if="item.mv">
						<image src="../../static/icon/播放5.png" mode="aspectFit"></image>
					</view>
					<view class="row-all">
						<image src="/static/icon/更多1.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			
			<view class="Load-more" @click="adddatamusiclist">
				<view class="Loadmore-text">
					加载更多
				</view>
				<view class="Loadmore-icon">
					<image src="../../static/icon/前往.png" mode="aspectFit"></image>
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
		
		<minmusic  
		v-show="$store.state.showplaycomponent"
		:imgk="musicpic" 
		:name="name" 
		:ren="ren" 
		:dd="dd"
		:love="love"
		:top="topnum"
		@stopkk="bilibili"
		ref="child"></minmusic>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	import minmusic from '../../components/minmusic/minmusic.vue'
	import nullFn from '../../utils/nullFn.js'
	export default {
		name:"contmin",
		data() {
			return {
				love: helper.contminlist.islove,
				musicpic: helper.contminlist.musicpic,
				name: helper.contminlist.name,
				ren: helper.contminlist.ren,
				dd: -100,
				num: 1,
				topnum: helper.plnumstr,
				id: null,
				musicdata: [],
				isplay: false
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
			},
			musicdatatitle: {
				type: String
			}
		},
		methods: {
			islove(id) {
				let idlist = uni.getStorageSync('userliveid')
				let x
				if(idlist) {
					x = idlist.some(item => {
						return item === id
					})					
				}
				return x
			},
			adddatamusiclist() {
				// console.log(this.title)
				let musicedatalength = this.musicdata.length
				uni.request({
					url: `${helper.url}/cloudsearch?keywords=${this.musicdatatitle}&limit=6&offset=${musicedatalength}&type=1`,
					success: (res) => {
						// console.log(res.data.result.songs)
						this.musicdata = [...this.musicdata, ...res.data.result.songs]
						// console.log(this.backsong)
						helper.musicpiclist = [...this.musicdata, ...res.data.result.songs]
					}
				})
			},
			getvideo(id,name) {
				uni.reLaunch({
					url: `/pages/video/video?id=${id}&index=2&title=${name}`
				})
			},
			stormusiclist(e, img, title, name, size, love) {
				let value = uni.getStorageSync('musiclist');
				let np = false
				
				if(value) {
					let kenum = value.findIndex(function(item) {
						return item.e === e
					})
					if(kenum >= 0) {
						this.$store.commit('changeSubscript', kenum)
					}else if(kenum <= 0) {
						this.$store.commit('changeSubscript', 0)
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
				}else if(!value || value.length === 0) {
					uni.setStorageSync('musiclist', [{
						e,
						title,
						name,
						img,
						size,
						love
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
						size,
						love
					})
					// console.log(tp)
					uni.setStorageSync('musiclist', tp);
				}
			},
			startgq(id,img, title, name,playsize) {
				uni.request({
					url: `${helper.url}/check/music?id=${id}`,
					success: (res) => {
						this.isplay = res.data.success
				
				
						if(!this.isplay) {
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
					if (uni.getStorageSync('musiclist') <= 1) {
						helper.audiok.stop()
						this.$store.commit('changeControl', 1)
					} else {
						console.log(this.$refs.child)
						this.$refs.child.down()
					}
				})
				
				
				this.id = id
				helper.moredetail.push({
					"name": title,
					"singer": name
				})
				
				this.$store.commit('changeControl', 0)
				uni.request({
					url: `${helper.url}/comment/music?id=${id}&limit=1`,
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
						this.stormusiclist(id, img, title, name, this.topnum, this.love)
					}
				})

				uni.request({
					// url: `http://localhost:3000/song/url/v1?id=${k}&level=exhigh`,
					url: `${helper.url}/song/url/v1?id=${id}&level=exhigh`,
					success: (res) => {

						this.musicpic = img
						helper.contminlist.musicpic = img
						
						this.name = title
						helper.contminlist.name = title
						
						this.ren = name
						helper.contminlist.ren = name
						
						// this.$paper.ch = true
						
						this.dd = 0
						helper.contminlist.dd = 0
						
						this.$store.commit('changeshow', 1)
						
						// console.log('1',res.data.data[0].url)
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
				// if(this.num != e) {
				// 	this.num = 1
				// 	this.dd = -100
				// 	helper.contminlist.dd = -100
				// 	// console.log(11,'k')
				// } else {
				// 	// console.log(11,'k1')
				// 	this.num = e
				// 	this.dd = 0
				// 	helper.contminlist.dd = 0
				// }
			},

			fillters(e) {
				let s = e /10000
				// let value = this.getBit(s)
				
				let str = Number(s);
				str = str.toFixed(2)

				return str
			}
		},
		watch: {
			back(val) {
				this.musicdata = this.back
			}
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

						
					.row-center {
						width: 500rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						color: var(--listboxrowcolor);
						.love {
							display: inline-block;
							width: 40rpx;
							height: 40rpx;
							background-color: red;
						}
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
			
			.Load-more {
				padding: 35rpx 0 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.Loadmore-text {
					color: var(--listboxfontcolor);
					font-size: 35rpx;
				}
				.Loadmore-icon {
					width: 45rpx;
					height: 45rpx;
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